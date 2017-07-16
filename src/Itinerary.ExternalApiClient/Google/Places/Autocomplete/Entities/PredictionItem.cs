using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Autocomplete.Entities
{
  public class PredictionItem
  {
    [JsonProperty( "description" )]
    public string Description { get; set; }

    [JsonProperty( "id" )]
    public string Id { get; set; }

    [JsonProperty( "matched_substrings" )]
    public MatchedSubstring[] MatchedSubstrings { get; set; }

    [JsonProperty( "place_id" )]
    public string PlaceId { get; set; }

    [JsonProperty( "reference" )]
    public string Reference { get; set; }

    [JsonProperty( "structured_formatting" )]
    public StructuredFormatting StructuredFormatting { get; set; }

    [JsonProperty( "terms" )]
    public Term[] Terms { get; set; }

    [JsonProperty( "types" )]
    public string[] Types { get; set; }
  }
}