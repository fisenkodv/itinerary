using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Details.Entities
{
  public class OpeningHours
  {
    [JsonProperty(propertyName: "open_now")]
    public bool OpenNow { get; set; }

    [JsonProperty(propertyName: "periods")]
    public OpeningPeriod[] Periods { get; set; }

    [JsonProperty(propertyName: "weekday_text")]
    public string[] WeekdayText { get; set; }
  }
}
