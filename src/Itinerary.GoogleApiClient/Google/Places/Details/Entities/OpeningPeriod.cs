using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Google.Places.Details.Entities
{
  public class OpeningPeriod
  {
    [JsonProperty( propertyName: "close" )]
    public OpeningSubPeriod Close { get; set; }

    [JsonProperty( propertyName: "open" )]
    public OpeningSubPeriod Open { get; set; }
  }
}
