using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Common.Entities
{
  public class Geometry
  {
    [JsonProperty( "location" )]
    public LocationPoint Location { get; set; }

    [JsonProperty( "viewport" )]
    public ViewPort ViewPort { get; set; }
  }
}