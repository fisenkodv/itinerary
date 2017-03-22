using Itinerary.Business.Api.Google.Places.Common.Entities;
using Itinerary.Business.Api.Google.Places.Search.Entities.Common;
using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Search.Entities.Text
{
  public class TextResultItem
  {
    [JsonProperty( "geometry" )]
    public Geometry Geometry { get; set; }

    [JsonProperty( "icon" )]
    public string Icon { get; set; }

    [JsonProperty( "id" )]
    public string Id { get; set; }

    [JsonProperty( "name" )]
    public string Name { get; set; }

    [JsonProperty( "photos" )]
    public Photo[] Photos { get; set; }

    [JsonProperty( "place_id" )]
    public string PlaceId { get; set; }

    [JsonProperty( "price_level" )]
    public int PriceLevel { get; set; }

    [JsonProperty( "rating" )]
    public float Rating { get; set; }

    [JsonProperty( "reference" )]
    public string Reference { get; set; }

    [JsonProperty( "scope" )]
    public string Scope { get; set; }

    [JsonProperty( "types" )]
    public string[] Types { get; set; }

    [JsonProperty( "formatted_address " )]
    public string FormattedAddress { get; set; }
  }
}