using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Itinerary.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;

namespace Itinerary.Tests.Utilities
{
  public abstract class IntegrationTestBase : IDisposable
  {
    private readonly HttpClient _httpClient;

    protected IntegrationTestBase()
    {
      CleanUp();

      _httpClient = GetClient();
    }

    public void Dispose()
    {
      _httpClient?.Dispose();
      CleanUp();
    }

    protected async Task<string> Get( string url )
    {
      HttpResponseMessage response = await _httpClient.GetAsync( url );
      return await response.Content.ReadAsStringAsync();
    }

    private static HttpClient GetClient()
    {
      IConfigurationRoot configuration = new ConfigurationBuilder().Build();
      IWebHostBuilder builder = new WebHostBuilder()
        .UseEnvironment( "Integration" )
         .UseConfiguration( configuration )
         .UseStartup<Startup>();
      var testServer = new TestServer( builder );
      HttpClient client = testServer.CreateClient();
      return client;
    }

    private static void CleanUp()
    {
      const string dbFileName = "itinerary.integration.db";
      if ( File.Exists( dbFileName ) )
        File.Delete( dbFileName );
    }
  }
}
