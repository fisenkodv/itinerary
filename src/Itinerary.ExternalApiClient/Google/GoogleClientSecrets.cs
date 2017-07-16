using System.Collections.Generic;
using System.Linq;

namespace Itinerary.Business.Api.Google
{
  public class GoogleClientSecrets
  {
    private readonly Dictionary<string, string> _apiKeys;

    public GoogleClientSecrets( IEnumerable<(string serviceName, string apiKey )> apiKeys )
    {
      _apiKeys = apiKeys.ToDictionary( x => x.serviceName, x => x.apiKey );
    }

    public string this[ string serviceName ] => _apiKeys[ serviceName ];
  }
}
