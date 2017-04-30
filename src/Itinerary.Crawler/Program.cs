using System;
using Itinerary.Crawler.TripAdviser;
using Microsoft.Extensions.Logging;

namespace Itinerary.Crawler
{
  class Program
  {
    static void Main( string[] args )
    {
      ILoggerFactory loggerFactory = new LoggerFactory()
        .AddConsole( ( text, logLevel ) => logLevel >= LogLevel.Information, false );

      ILogger logger = loggerFactory.CreateLogger<TripAdviserCrawler>();

      var crawler = new TripAdviserCrawler( "map.db", TimeSpan.FromSeconds( 1 ), logger );
      //crawler.Run( 51.34433866, -169.01367187, 23.72501174, -57.83203125, 13, 1000 );
      crawler.ConvertToCSharpSnapshot( "PlacesSnapshot.json" );
    }
  }
}
