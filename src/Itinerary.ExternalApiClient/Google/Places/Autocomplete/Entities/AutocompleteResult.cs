using Newtonsoft.Json;

namespace Itinerary.ExternalApiClient.Google.Places.Autocomplete.Entities
{
  public class AutocompleteResult
  {
    [JsonProperty( propertyName: "predictions" )]
    public PredictionItem[] Predictions { get; set; }

    [JsonProperty( propertyName: "status" )]
    public string Status { get; set; }
  }
}
