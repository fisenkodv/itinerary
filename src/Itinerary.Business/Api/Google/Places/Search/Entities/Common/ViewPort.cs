using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Search.Entities.Common
{
  public class ViewPort
  {
    [JsonProperty( "northeast" )]
    public LocationPoint NorthEast { get; set; }

    [JsonProperty( "southwest" )]
    public LocationPoint SouthWest { get; set; }
  }
}