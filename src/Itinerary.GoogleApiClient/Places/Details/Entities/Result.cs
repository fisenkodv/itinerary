using Itinerary.GoogleApiClient.Places.Common.Entities;
using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Details.Entities
{
  public class Result
  {
    [JsonProperty( propertyName: "address_components" )]
    public AddressComponent[] AddressComponents { get; set; }

    [JsonProperty( propertyName: "adr_address" )]
    public string AdrAddress { get; set; }

    [JsonProperty( propertyName: "formatted_address" )]
    public string FormattedAddress { get; set; }

    [JsonProperty( propertyName: "formatted_phone_number" )]
    public string FormattedPhoneNumber { get; set; }

    [JsonProperty( propertyName: "geometry" )]
    public Geometry Geometry { get; set; }

    [JsonProperty( propertyName: "icon" )]
    public string Icon { get; set; }

    [JsonProperty( propertyName: "id" )]
    public string Id { get; set; }

    [JsonProperty( propertyName: "international_phone_number" )]
    public string InternationalPhoneNumber { get; set; }

    [JsonProperty( propertyName: "name" )]
    public string Name { get; set; }

    [JsonProperty( propertyName: "photos" )]
    public Photo[] Photos { get; set; }

    [JsonProperty( propertyName: "place_id" )]
    public string PlaceId { get; set; }

    [JsonProperty( propertyName: "rating" )]
    public float Rating { get; set; }

    [JsonProperty( propertyName: "reference" )]
    public string Reference { get; set; }

    [JsonProperty( propertyName: "reviews" )]
    public Review[] Reviews { get; set; }

    [JsonProperty( propertyName: "scope" )]
    public string Scope { get; set; }

    [JsonProperty( propertyName: "types" )]
    public string[] Types { get; set; }

    [JsonProperty( propertyName: "url" )]
    public string Url { get; set; }

    [JsonProperty( propertyName: "utc_offset" )]
    public int UtcOffset { get; set; }

    [JsonProperty( propertyName: "vicinity" )]
    public string Vicinity { get; set; }

    [JsonProperty( propertyName: "website" )]
    public string Website { get; set; }
  }
}
