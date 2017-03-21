using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Search.Entities.Common
{
  public class GenericResult<T>
  {
    [JsonProperty( "next_page_token" )]
    public string NextPageToken { get; set; }

    [JsonProperty( "results" )]
    public T[] Results { get; set; }

    [JsonProperty( "status" )]
    public string Status { get; set; }
  }
}