using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using Itinerary.Business.Itinerary.Places.Dto;
using Itinerary.Crawler.TripAdviser.Entities;
using LiteDB;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

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

    public void ConvertToCSharpSnapshot( string outputFile )
    {
      IEnumerable<PlaceDetails> places = ConvertToPlaceDetails( GetSegmentsCollection().FindAll() );
      File.WriteAllText( outputFile, JsonConvert.SerializeObject( places ) );
    }

    public void Run( double startLat, double startLng, double endLat, double endLng, double zoom, double size )
    {
      int index = 0;

      _logger.LogInformation( "Removing bad data..." );

      BsonValue[] badRecords =
        GetSegmentsCollection()
          .FindAll()
          .Where(
            x =>
              x.Map.Attractions.Any(
                a => a.Rating == 0 || a.Reviews == 0 || string.IsNullOrEmpty( a.ImgUrl ) ) )
          .Select( x => new BsonValue( x.Id ) )
          .ToArray();
      GetSegmentsCollection().Delete( Query.In( "Id", badRecords ) );

      _logger.LogInformation( $"Removed {badRecords.Length} records with not filled rating, reviews etc." );

      _logger.LogInformation( "Reading existing data..." );

      Dictionary<string, Segment> segments = GetSegmentsCollection()
        .Find( x => x.Zoom == zoom && x.Size == size )
        .ToDictionary( x => GetKey( x.Latitude, x.Longitude ), x => x );

      _logger.LogInformation( "Preparing points..." );

      var coordinates = new List<(double lat, double lng)>();
      for ( double lat = endLat; lat <= startLat; lat += zoom * 10 / size )
      for ( double lng = startLng; lng <= endLng; lng += zoom * 10 / size )
      {
        if ( !segments.ContainsKey( GetKey( lat, lng ) ) )
          coordinates.Add( (lat: lat, lng: lng) );
      }

      foreach ( (double lat, double lng) coordinate in coordinates )
      {
        double lat = coordinate.lat;
        double lng = coordinate.lng;

        ReadSegment( lat, lng, zoom, size );

        Interlocked.Increment( ref index );
        _logger.LogInformation( $"{index * 100.0 / coordinates.Count} complete" );
      }
    }

    private static string GetKey( double lat, double lng )
    {
      return $"{lat}{lng}";
    }

    private LiteCollection<Segment> GetSegmentsCollection()
    {
      return _liteDatabase.GetCollection<Segment>( "segments" );
    }

    private void ReadSegment( double lat, double lng, double zoom, double size )
    {
      try
      {
        var httpClient = new HttpClient();
        string url =
          $"https://www.tripadvisor.com/GMapsLocationController?Action=update&from=Attractions&g=35805&geo=35805&mapProviderFeature=ta-maps-gmaps3&validDates=false&mc={lat},{lng}&mz={zoom}&mw={size}&mh={size}&pinSel=v2&origLocId=35805&sponsors=&finalRequest=false&includeMeta=false&trackPageView=false";

        Thread.Sleep( TimeSpan.FromSeconds( 0.1 ) );
        byte[] json = httpClient.GetByteArrayAsync( url ).Result;

        _logger.LogDebug( $"Read segment {lat}, {lng}. {json.Length} bytes." );

        using ( TextReader streamReader = new StreamReader( new MemoryStream( json ) ) )
        using ( var jsonTextReader = new JsonTextReader( streamReader ) )
        {
          var serializer = new Newtonsoft.Json.JsonSerializer();
          var map = serializer.Deserialize<Map>( jsonTextReader );

          var segment = new Segment { Latitude = lat, Longitude = lng, Zoom = zoom, Size = size, Map = map };
          _logger.LogInformation( $"Found {map.Attractions.Count} attractions" );

          GetSegmentsCollection().Insert( segment );

          foreach ( Attraction attraction in segment.Map.Attractions )
          {
            _logger.LogDebug( $"Attraction: {attraction.CustomHover.Title}" );

            string infoUrl =
              $"https://www.tripadvisor.com{attraction.CustomHover.Url.Replace( "Action=info", "Action=infoCardAttr" )}";

            Thread.Sleep( _delay );

            string html = httpClient.GetStringAsync( infoUrl ).Result;
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

    private static IEnumerable<PlaceDetails> ConvertToPlaceDetails( IEnumerable<Segment> segments )
    {
      return
        from segment in segments
        where segment.Map.Attractions.Any()
        from attraction in segment.Map.Attractions
        select new PlaceDetails(
          attraction.CustomHover.Title ?? string.Empty,
          attraction.Rating,
          attraction.Reviews,
          attraction.Categories ?? Enumerable.Empty<string>(),
          attraction.Url ?? string.Empty,
          attraction.ImgUrl ?? string.Empty,
          new Location( attraction.Lat, attraction.Lng ) );
    }

    public void Dispose()
    {
      _liteDatabase.Dispose();
    }
  }
}
