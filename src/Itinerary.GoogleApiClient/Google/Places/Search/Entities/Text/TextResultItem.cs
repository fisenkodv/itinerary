using Itinerary.GoogleApiClient.Google.Places.Common.Entities;
using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Google.Places.Search.Entities.Text
{
  public class TextResultItem
  {
    [JsonProperty( propertyName: "geometry" )]
    public Geometry Geometry { get; set; }

    [JsonProperty( propertyName: "icon" )]
    public string Icon { get; set; }

    [JsonProperty( propertyName: "id" )]
    public string Id { get; set; }

    [JsonProperty( propertyName: "name" )]
    public string Name { get; set; }

    [JsonProperty( propertyName: "photos" )]
    public Photo[] Photos { get; set; }

    [JsonProperty( propertyName: "place_id" )]
    public string PlaceId { get; set; }

    [JsonProperty( propertyName: "price_level" )]
    public int PriceLevel { get; set; }

    [JsonProperty( propertyName: "rating" )]
    public float Rating { get; set; }

    [JsonProperty( propertyName: "reference" )]
    public string Reference { get; set; }

    [JsonProperty( propertyName: "scope" )]
    public string Scope { get; set; }

    [JsonProperty( propertyName: "types" )]
    public string[] Types { get; set; }

    [JsonProperty( propertyName: "formatted_address " )]
    public string FormattedAddress { get; set; }
  }
}
