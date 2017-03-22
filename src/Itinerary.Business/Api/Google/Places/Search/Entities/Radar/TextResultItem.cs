using Itinerary.Business.Api.Google.Places.Common.Entities;
using Itinerary.Business.Api.Google.Places.Search.Entities.Common;
using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Search.Entities.Radar
{
  public class RadarResultItem
  {
    [JsonProperty( "geometry" )]
    public Geometry Geometry { get; set; }

    [JsonProperty( "id" )]
    public string Id { get; set; }

    [JsonProperty( "place_id" )]
    public string PlaceId { get; set; }

    [JsonProperty( "reference" )]
    public string Reference { get; set; }
  }
}