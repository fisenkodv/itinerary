using Itinerary.GoogleApiClient.Google.Places.Common.Entities;
using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Google.Places.Search.Entities.Radar
{
  public class RadarResultItem
  {
    [JsonProperty( propertyName: "geometry" )]
    public Geometry Geometry { get; set; }

    [JsonProperty( propertyName: "id" )]
    public string Id { get; set; }

    [JsonProperty( propertyName: "place_id" )]
    public string PlaceId { get; set; }

    [JsonProperty( propertyName: "reference" )]
    public string Reference { get; set; }
  }
}
