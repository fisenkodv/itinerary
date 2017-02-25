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
        .AddConsole((text, logLevel) => logLevel >= LogLevel.Information, false);

      ILogger logger = loggerFactory.CreateLogger<TripAdviserCrawler>();

      var crawler = new TripAdviserCrawler( TimeSpan.FromSeconds( 1 ), logger );
      crawler.Run( 49.310786, -126.363568, 24.056479, -68.718305, 13, 1000 );

      crawler.Dump( "map.json" );
    }
  }
}