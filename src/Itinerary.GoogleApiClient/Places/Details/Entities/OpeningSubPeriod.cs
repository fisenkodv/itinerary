using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Details.Entities
{
  public class OpeningSubPeriod
  {
    [JsonProperty(propertyName: "day")]
    public int Day { get; set; }

    [JsonProperty(propertyName: "time")]
    public int Time { get; set; }
  }
}
