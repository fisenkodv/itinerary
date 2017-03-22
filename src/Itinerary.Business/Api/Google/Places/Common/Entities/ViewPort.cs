using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Common.Entities
{
  public class ViewPort
  {
    [JsonProperty( "northeast" )]
    public LocationPoint NorthEast { get; set; }

    [JsonProperty( "southwest" )]
    public LocationPoint SouthWest { get; set; }
  }
}