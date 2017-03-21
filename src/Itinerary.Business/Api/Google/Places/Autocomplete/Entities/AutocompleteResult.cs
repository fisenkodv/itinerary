using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Autocomplete.Entities
{
  public class AutocompleteResult
  {
    [JsonProperty( "predictions" )]
    public PredictionItem[] Predictions { get; set; }

    [JsonProperty( "status" )]
    public string Status { get; set; }
  }
}