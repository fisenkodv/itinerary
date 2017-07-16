using Itinerary.Business.Api.Google.Places.Common.Entities;
using Itinerary.Business.Api.Google.Places.Search.Entities.Common;
using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Details.Entities
{
  public class Result
  {
    [JsonProperty( "address_components" )]
    public AddressComponent[] AddressComponents { get; set; }

    [JsonProperty( "adr_address" )]
    public string AdrAddress { get; set; }

    [JsonProperty( "formatted_address" )]
    public string FormattedAddress { get; set; }

    [JsonProperty( "formatted_phone_number" )]
    public string FormattedPhoneNumber { get; set; }

    [JsonProperty( "geometry" )]
    public Geometry Geometry { get; set; }

    [JsonProperty( "icon" )]
    public string Icon { get; set; }

    [JsonProperty( "id" )]
    public string Id { get; set; }

    [JsonProperty( "international_phone_number" )]
    public string InternationalPhoneNumber { get; set; }

    [JsonProperty( "name" )]
    public string Name { get; set; }

    [JsonProperty( "photos" )]
    public Photo[] Photos { get; set; }

    [JsonProperty( "place_id" )]
    public string PlaceId { get; set; }

    [JsonProperty( "rating" )]
    public float Rating { get; set; }

    [JsonProperty( "reference" )]
    public string Reference { get; set; }

    [JsonProperty( "reviews" )]
    public Review[] Reviews { get; set; }

    [JsonProperty( "scope" )]
    public string Scope { get; set; }

    [JsonProperty( "types" )]
    public string[] Types { get; set; }

    [JsonProperty( "url" )]
    public string Url { get; set; }

    [JsonProperty( "utc_offset" )]
    public int UtcOffset { get; set; }

    [JsonProperty( "vicinity" )]
    public string Vicinity { get; set; }

    [JsonProperty( "website" )]
    public string Website { get; set; }
  }
}