using System.Net.Http;
using System.Threading.Tasks;
using Itinerary.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;

namespace Itinerary.Tests.Utilities
{
  //TODO: remove db in constructor if exists, move test snapshot to test project
  public abstract class IntegrationTestBase
  {
    private readonly HttpClient _httpClient;

    public IntegrationTestBase()
    {
      _httpClient = GetClient();
    }

    public async Task<string> Get( string url )
    {
      HttpResponseMessage response = await _httpClient.GetAsync( url );
      return await response.Content.ReadAsStringAsync();
    }

    private static HttpClient GetClient()
    {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .Build();
      IWebHostBuilder builder = new WebHostBuilder()
        .UseEnvironment( "Integration" )
        .UseConfiguration( configuration )
        .UseStartup<Startup>();
      var testServer = new TestServer( builder );
      HttpClient client = testServer.CreateClient();
      return client;
    }
  }
}
