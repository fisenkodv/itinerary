using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Details.Entities
{
  public class OpeningSubPeriod
  {
    [JsonProperty( "day" )]
    public int Day { get; set; }

    [JsonProperty( "time" )]
    public int Time { get; set; }
  }
}