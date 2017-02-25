using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using Itinerary.Crawler.TripAdviser.Entities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Itinerary.Crawler.TripAdviser
{
  internal class TripAdviserCrawler
  {
    private readonly TimeSpan _delay;
    private readonly ILogger _logger;
    private readonly HashSet<Attraction> _attractions = new HashSet<Attraction>();

    private static readonly Regex CategoryRegex = new Regex(
      pattern: "<div class=\"gray-footer \">(?<category>.*?)<\\/div>", options: RegexOptions.Singleline );

    private static readonly Regex ImgRegex =
      new Regex( pattern: "https://media-cdn.tripadvisor.com/media/photo-[^']+.jpg" );

    private static readonly Regex RatingRegex =
      new Regex( pattern: @"src=""https://static.tacdn.com/img2/x.gif"" alt=""(?<rating>[0-9,.]+) of 5 stars""" );

    private static readonly Regex ReviewsRegex = new Regex( pattern: "(?<reviews>[0-9,.]+) review" );

    public TripAdviserCrawler(TimeSpan delay, ILogger logger )
    {
      _delay = delay;
      _logger = logger;
    }

    public IEnumerable<Attraction> Attractions => _attractions;

    public void Run( double startLat, double startLng, double endLat, double endLng, double zoom, double size )
    {
      double area = ( startLat - endLat ) * ( endLng - startLng );
      for ( double lat = endLat; lat <= startLat; lat += zoom * 10 / size )
      for ( double lng = startLng; lng <= endLng; lng += zoom * 10 / size )
      {
        double covered = ( lat - endLat ) * ( endLng - startLng ) + ( lng - startLng ) * zoom * 10 / size;
        ReadSegment( lat, lng, zoom, size );

        _logger.LogInformation( $"{covered / area * 100}% complete" );
      }
    }

    public void Dump( string filename )
    {
      using ( var writer = new StreamWriter( File.Create( filename ) ) )
      {
        var serializer = new JsonSerializer();
        serializer.Serialize( writer, _attractions );
      }
    }

    private async void ReadSegment( double lat, double lng, double zoom, double size )
    {
      var httpClient = new HttpClient();
      Directory.CreateDirectory( path: "download" );
      string segmentFilename = GetDownloadedFilePath( $"{lat:0.0000}_{lng:0.0000}_{zoom}_{size}.json" );
      byte[] json;
      if ( !File.Exists( segmentFilename ) )
      {
        string url =
          $"https://www.tripadvisor.com/GMapsLocationController?Action=update&from=Attractions&g=35805&geo=35805&mapProviderFeature=ta-maps-gmaps3&validDates=false&mc={lat},{lng}&mz={zoom}&mw={size}&mh={size}&pinSel=v2&origLocId=35805&sponsors=&finalRequest=false&includeMeta=false&trackPageView=false";
        //Thread.Sleep(Delay);
        Thread.Sleep( TimeSpan.FromSeconds( value: 0.1 ) );
        json = await httpClient.GetByteArrayAsync( url );

        _logger.LogDebug( $"Read segment {lat}, {lng}. {json.Length} bytes." );


        var str = Encoding.UTF8.GetString( json );

        if ( json.Length > 400000 )
          throw new Exception( message: "Too much items. Increase zoom." );

        File.WriteAllBytes( segmentFilename, json );
      }
      else
      {
        json = File.ReadAllBytes( segmentFilename );
      }

      using ( var sr = new StreamReader( new MemoryStream( json ) ) )
      using ( var jsonTextReader = new JsonTextReader( sr ) )
      {
        var serializer = new JsonSerializer();
        var map = serializer.Deserialize<Map>( jsonTextReader );

        _logger.LogInformation( $"Found {map.Attractions.Count} attractions" );

        foreach ( Attraction attraction in map.Attractions )
        {
          _logger.LogDebug( $"Attraction: {attraction.CustomHover.Title}" );
          string attractionFilename = GetDownloadedFilePath( $"{attraction.LocId}.html" );
          string html;
          if ( !File.Exists( attractionFilename ) )
          {
            string infoUrl =
              $"https://www.tripadvisor.com{attraction.CustomHover.Url.Replace( "Action=info", "Action=infoCardAttr" )}";

            _logger.LogDebug( $"{attraction.LocId}: {infoUrl}" );
            Thread.Sleep( _delay );

            html = await httpClient.GetStringAsync( infoUrl );
            File.WriteAllText( attractionFilename, html );
          }
          else
          {
            html = File.ReadAllText( attractionFilename );
          }

          string imgUrl = ImgRegex.Match( html ).Value;
          string reviews = ReviewsRegex.Match( html ).Groups[ groupname: "reviews" ].Value;
          string rating = RatingRegex.Match( html ).Groups[ groupname: "rating" ].Value;
          string categories = CategoryRegex.Match( html ).Groups[ groupname: "category" ].Value.Trim( '\r', '\n', ' ' );

          _logger.LogDebug( $"reviews: {reviews}, rating: {rating}, categories: {categories}, image: {imgUrl}" );

          attraction.Categories =
            ( categories ?? string.Empty )
            .Split( separator: new[] { ',' }, options: StringSplitOptions.RemoveEmptyEntries )
            .Select( c => c.Trim( ' ' ) )
            .ToArray();

          attraction.ImgUrl = imgUrl;

          if ( !string.IsNullOrEmpty( reviews ) )
            attraction.Reviews = int.Parse( reviews, NumberStyles.AllowThousands );

          if ( !string.IsNullOrEmpty( rating ) )
            attraction.Rating = float.Parse( rating );

          if ( !_attractions.Contains( attraction ) )
            _attractions.Add( attraction );
          else
            _logger.LogDebug( $"Attraction {attraction.CustomHover.Title} already exists." );
        }
      }
    }

        private string GetDownloadedFilePath( string fileName )
    {
      return Path.Combine( "download", fileName );
    }
  }
}