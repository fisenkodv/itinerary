using Newtonsoft.Json;

namespace Itinerary.ExternalApiClient.Google.Places.Details.Entities
{
  public class DetailsResult
  {
    [JsonProperty( propertyName: "result" )]
    public Result Result { get; set; }

    [JsonProperty( propertyName: "status" )]
    public string Status { get; set; }
  }
}
