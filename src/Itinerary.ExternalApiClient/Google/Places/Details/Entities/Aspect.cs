using Newtonsoft.Json;

namespace Itinerary.ExternalApiClient.Google.Places.Details.Entities
{
  public class Aspect
  {
    [JsonProperty( propertyName: "rating" )]
    public int Rating { get; set; }

    [JsonProperty( propertyName: "type" )]
    public string Type { get; set; }
  }
}
