using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Itinerary.Crawler.TripAdviser.Entities;
using LiteDB;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Itinerary.Common.Entities;

namespace Itinerary.Crawler.TripAdviser
{
  internal class TripAdviserCrawler : IDisposable
  {
    private readonly TimeSpan _delay;
    private readonly ILogger _logger;
    private readonly LiteDatabase _liteDatabase;
    private readonly HashSet<Attraction> _attractions = new HashSet<Attraction>();

    private static readonly Regex CategoryRegex = new Regex(
      pattern: "<div class=\"gray-footer \">(?<category>.*?)<\\/div>", options: RegexOptions.Singleline );

    private static readonly Regex ImgRegex =
      new Regex( pattern: "https://media-cdn.tripadvisor.com/media/photo-[^']+.jpg" );

    private static readonly Regex RatingRegex =
      new Regex( pattern: "(?<rating>[0-9,.]+) of 5 bubbles" );

    private static readonly Regex ReviewsRegex = new Regex( pattern: "(?<reviews>[0-9,.]+) review" );

    public TripAdviserCrawler( string outputFile, TimeSpan delay, ILogger logger )
    {
      _delay = delay;
      _logger = logger;
      _liteDatabase = new LiteDatabase( outputFile );
    }

    public void ConvertToWebDb( string outputFile )
    {
      using ( var db = new LiteDatabase( outputFile ) )
      {
        var places = new List<Place>();
        foreach ( Segment segment in GetSegmentsCollection().FindAll() )
        {
          if ( !segment.Map.Attractions.Any() ) continue;

          IEnumerable<Place> attractionPlaces =
            from attraction in segment.Map.Attractions
            let location = new Location() { Latitude = attraction.Lat, Longitude = attraction.Lng }
            let place = new Place()
                        {
                          Location = location,
                          Name = attraction.CustomHover.Title,
                          Rating = attraction.Rating,
                          Reviews = attraction.Reviews
                        }
            select place;

          places.AddRange( attractionPlaces );
        }

        db.GetCollection<Place>( "places" ).Insert( places );
      }
    }

    public void Run( double startLat, double startLng, double endLat, double endLng, double zoom, double size )
    {
      int index = 0;
      double area = ( startLat - endLat ) * ( endLng - startLng );

      _logger.LogInformation( "Reading existing data..." );

      Dictionary<string, Segment> segments = GetSegmentsCollection()
        .Find( x => x.Zoom == zoom && x.Size == size )
        .ToDictionary( x => GetKey( x.Latitude, x.Longitude ), x => x );

      _logger.LogInformation( "Preparing points..." );

      var coordinates = new List<Tuple<double, double>>();
      for ( double lat = endLat; lat <= startLat; lat += zoom * 10 / size )
      for ( double lng = startLng; lng <= endLng; lng += zoom * 10 / size )
      {
        if ( !segments.ContainsKey( GetKey( lat, lng ) ) )
          coordinates.Add( new Tuple<double, double>( lat, lng ) );
      }

      Parallel.ForEach(
        coordinates, coordinate =>
                     {
                       double lat = coordinate.Item1;
                       double lng = coordinate.Item2;

                       ReadSegment( lat, lng, zoom, size );

                       Interlocked.Increment( ref index );
                       //double covered = ( lat - endLat ) * ( endLng - startLng ) +
                       //                 ( lng - startLng ) * zoom * 10 / size;
                       _logger.LogInformation( $"{index * 100.0 / coordinates.Count} complete" );
                     } );
    }

    private static string GetKey( double lat, double lng )
    {
      return $"{lat}{lng}";
    }

    private LiteCollection<Segment> GetSegmentsCollection()
    {
      return _liteDatabase.GetCollection<Segment>( "segments" );
    }

    private async void ReadSegment( double lat, double lng, double zoom, double size )
    {
      try
      {
        var httpClient = new HttpClient();
        string url =
          $"https://www.tripadvisor.com/GMapsLocationController?Action=update&from=Attractions&g=35805&geo=35805&mapProviderFeature=ta-maps-gmaps3&validDates=false&mc={lat},{lng}&mz={zoom}&mw={size}&mh={size}&pinSel=v2&origLocId=35805&sponsors=&finalRequest=false&includeMeta=false&trackPageView=false";

        Thread.Sleep( TimeSpan.FromSeconds( 0.1 ) );
        byte[] json = await httpClient.GetByteArrayAsync( url );

        _logger.LogDebug( $"Read segment {lat}, {lng}. {json.Length} bytes." );

        using ( var streamReader = new StreamReader( new MemoryStream( json ) ) )
        using ( var jsonTextReader = new JsonTextReader( streamReader ) )
        {
          var serializer = new Newtonsoft.Json.JsonSerializer();
          var map = serializer.Deserialize<Map>( jsonTextReader );

          var segment = new Segment() { Latitude = lat, Longitude = lng, Zoom = zoom, Size = size, Map = map };
          _logger.LogInformation( $"Found {map.Attractions.Count} attractions" );

          GetSegmentsCollection().Insert( segment );

          foreach ( Attraction attraction in segment.Map.Attractions )
          {
            _logger.LogDebug( $"Attraction: {attraction.CustomHover.Title}" );

            string infoUrl =
              $"https://www.tripadvisor.com{attraction.CustomHover.Url.Replace( "Action=info", "Action=infoCardAttr" )}";

            Thread.Sleep( _delay );

            string html = await httpClient.GetStringAsync( infoUrl );
            string imgUrl = ImgRegex.Match( html ).Value;
            string reviews = ReviewsRegex.Match( html ).Groups[ groupname: "reviews" ].Value;
            string rating = RatingRegex.Match( html ).Groups[ groupname: "rating" ].Value;
            string categories = CategoryRegex
              .Match( html )
              .Groups[ groupname: "category" ]
              .Value.Trim( '\r', '\n', ' ' );

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

          GetSegmentsCollection().Update( segment );
        }
      }
      catch ( Exception e )
      {
        _logger.LogError( e.Message );
      }
    }

    public void Dispose()
    {
      _liteDatabase.Dispose();
    }
  }
}