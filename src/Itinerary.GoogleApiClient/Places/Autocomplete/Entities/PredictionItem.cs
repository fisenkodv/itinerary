using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Autocomplete.Entities
{
  public class PredictionItem
  {
    [JsonProperty(propertyName: "description")]
    public string Description { get; set; }

    [JsonProperty(propertyName: "id")]
    public string Id { get; set; }

    [JsonProperty(propertyName: "matched_substrings")]
    public MatchedSubstring[] MatchedSubstrings { get; set; }

    [JsonProperty(propertyName: "place_id")]
    public string PlaceId { get; set; }

    [JsonProperty(propertyName: "reference")]
    public string Reference { get; set; }

    [JsonProperty(propertyName: "structured_formatting")]
    public StructuredFormatting StructuredFormatting { get; set; }

    [JsonProperty(propertyName: "terms")]
    public Term[] Terms { get; set; }

    [JsonProperty(propertyName: "types")]
    public string[] Types { get; set; }
  }
}
