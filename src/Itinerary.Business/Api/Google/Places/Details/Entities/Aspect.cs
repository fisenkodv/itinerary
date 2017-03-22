using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Details.Entities
{
  public class Aspect
  {
    [JsonProperty( "rating" )]
    public int Rating { get; set; }

    [JsonProperty( "type" )]
    public string Type { get; set; }
  }
}