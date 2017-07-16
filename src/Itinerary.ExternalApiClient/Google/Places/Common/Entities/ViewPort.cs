using Newtonsoft.Json;

namespace Itinerary.ExternalApiClient.Google.Places.Common.Entities
{
  public class ViewPort
  {
    [JsonProperty( propertyName: "northeast" )]
    public LocationPoint NorthEast { get; set; }

    [JsonProperty( propertyName: "southwest" )]
    public LocationPoint SouthWest { get; set; }
  }
}
