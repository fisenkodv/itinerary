using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Search.Entities.Common
{
  public class Geometry
  {
    [JsonProperty( "location" )]
    public LocationPoint Location { get; set; }

    [JsonProperty( "viewport" )]
    public ViewPort ViewPort { get; set; }
  }
}