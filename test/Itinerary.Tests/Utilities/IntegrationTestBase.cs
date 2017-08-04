using System;
using System.Net.Http;
using System.Threading.Tasks;
using Itinerary.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace Itinerary.Tests.Utilities
{
  public class IntegrationTestBase
  {
    private readonly TestServer _testServer;
    private readonly HttpClient _httpClient;

    public IntegrationTestBase()
    {
      _testServer = new TestServer( new WebHostBuilder().UseStartup<Startup>() );
      _httpClient = _testServer.CreateClient();
    }

    public async Task<string> Get( string url )
    {
      HttpResponseMessage response = await _httpClient.GetAsync( url );
      return await response.Content.ReadAsStringAsync();
    }
  }
}
