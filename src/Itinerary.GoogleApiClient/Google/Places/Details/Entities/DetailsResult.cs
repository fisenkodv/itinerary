using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Google.Places.Details.Entities
{
  public class DetailsResult
  {
    [JsonProperty( propertyName: "result" )]
    public Result Result { get; set; }

    [JsonProperty( propertyName: "status" )]
    public string Status { get; set; }
  }
}
