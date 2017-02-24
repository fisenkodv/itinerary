using Newtonsoft.Json;

namespace Itinerary.Crawler.TripAdviser.Entities
{
  public class AddressInfo
  {
    [JsonProperty( "name" )]
    public string Name { get; set; }

    [JsonProperty( "address" )]
    public string Address { get; set; }
  }
}