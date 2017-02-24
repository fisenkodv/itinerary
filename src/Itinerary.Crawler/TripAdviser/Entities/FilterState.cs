using Newtonsoft.Json;

namespace Itinerary.Crawler.TripAdviser.Entities
{
  public class FilterState
  {
    [JsonProperty( "cat" )]
    public int Cat { get; set; }
  }
}