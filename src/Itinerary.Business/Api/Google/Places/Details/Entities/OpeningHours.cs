using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Details.Entities
{
  public class OpeningHours
  {
    [JsonProperty( "open_now" )]
    public bool OpenNow { get; set; }

    [JsonProperty( "periods" )]
    public OpeningPeriod[] Periods { get; set; }

    [JsonProperty( "weekday_text" )]
    public string[] WeekdayText { get; set; }
  }
}