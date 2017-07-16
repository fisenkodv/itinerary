using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace Itinerary.ExternalApiClient.Google
{
  public static class GoogleClientSecretsExtensions
  {
    public static GoogleClientSecrets GetGoogleClientSecrets( this IConfiguration configuration )
    {
      IConfigurationSection section = configuration?.GetSection( key: "API:Google" );
      IEnumerable<ValueTuple<string, string>> apiKeys =
        Enumerable.Empty<(string serviceName, string apiKey)>();
      if ( section != null )
        apiKeys = section.GetChildren().Select( x => (x.Key, x.Value) );

      return new GoogleClientSecrets( apiKeys );
    }
  }
}
