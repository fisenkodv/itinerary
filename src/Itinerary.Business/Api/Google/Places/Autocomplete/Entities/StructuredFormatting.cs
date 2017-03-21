using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Autocomplete.Entities
{
  public class StructuredFormatting
  {
    [JsonProperty( "main_text" )]
    public string MainText { get; set; }

    [JsonProperty( "main_text_matched_substrings" )]
    public MatchedSubstring[] MainTextMatchedSubstrings { get; set; }

    [JsonProperty( "secondary_text" )]
    public string SecondaryText { get; set; }
  }
}