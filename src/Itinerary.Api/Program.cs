using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.Extensions.Configuration;

namespace Itinerary.Api
{
  public class Program
  {
    public static void Main( string[] args )
    {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddCommandLine( args )
        .Build();

      IWebHost host = new WebHostBuilder()
        .UseKestrel()
        .UseContentRoot( Directory.GetCurrentDirectory() )
        .UseConfiguration( configuration )
        .UseIISIntegration()
        .UseStartup<Startup>()
        .UseApplicationInsights()
        .Build();

      host.Run();
    }

    //todo: https://docs.microsoft.com/en-us/ef/core/miscellaneous/1x-2x-upgrade
    //public static IWebHost BuildWebHost( string[] args ) =>
    //  WebHost.CreateDefaultBuilder( args )
    //         .UseStartup<Startup>()
    //         .Build();
  }
}
