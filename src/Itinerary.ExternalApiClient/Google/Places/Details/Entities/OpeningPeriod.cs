using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Details.Entities
{
  public class OpeningPeriod
  {
    [JsonProperty( "close" )]
    public OpeningSubPeriod Close { get; set; }

    [JsonProperty( "open" )]
    public OpeningSubPeriod Open { get; set; }
  }
}