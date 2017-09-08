using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Autocomplete.Entities
{
  public class Term
  {
    [JsonProperty( propertyName: "offset" )]
    public int Offset { get; set; }

    [JsonProperty( propertyName: "value" )]
    public string Value { get; set; }
  }
}
