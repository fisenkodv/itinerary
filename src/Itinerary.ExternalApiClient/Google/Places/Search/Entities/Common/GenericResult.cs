using Newtonsoft.Json;

namespace Itinerary.ExternalApiClient.Google.Places.Search.Entities.Common
{
  public class GenericResult<T>
  {
    [JsonProperty( propertyName: "next_page_token" )]
    public string NextPageToken { get; set; }

    [JsonProperty( propertyName: "results" )]
    public T[] Results { get; set; }

    [JsonProperty( propertyName: "status" )]
    public string Status { get; set; }
  }
}
