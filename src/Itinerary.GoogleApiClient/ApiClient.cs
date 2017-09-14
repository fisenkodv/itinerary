using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient
{
  internal sealed class ApiClient
  {
    private readonly JsonSerializer _jsonSerializer;

    public ApiClient()
    {
      _jsonSerializer = JsonSerializer.Create();
    }

    public async Task<T> GetResponseAsync<T>(string queryUrl)
    {
      using (var client = new HttpClient())
      {
        string json = await client.GetStringAsync(queryUrl);
        using (var jsonTextReader = new JsonTextReader(reader: new StringReader(json)))
        {
          var response = _jsonSerializer.Deserialize<T>(jsonTextReader);
          return response;
        }
      }
    }
  }
}
