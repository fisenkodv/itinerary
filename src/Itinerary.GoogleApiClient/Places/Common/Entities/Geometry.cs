using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Common.Entities
{
  public class Geometry
  {
    [JsonProperty( propertyName: "location" )]
    public LocationPoint Location { get; set; }

    [JsonProperty( propertyName: "viewport" )]
    public ViewPort ViewPort { get; set; }
  }
}
