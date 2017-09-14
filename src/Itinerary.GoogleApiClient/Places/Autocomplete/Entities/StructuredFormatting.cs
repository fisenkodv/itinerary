using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Autocomplete.Entities
{
  public class StructuredFormatting
  {
    [JsonProperty(propertyName: "main_text")]
    public string MainText { get; set; }

    [JsonProperty(propertyName: "main_text_matched_substrings")]
    public MatchedSubstring[] MainTextMatchedSubstrings { get; set; }

    [JsonProperty(propertyName: "secondary_text")]
    public string SecondaryText { get; set; }
  }
}
