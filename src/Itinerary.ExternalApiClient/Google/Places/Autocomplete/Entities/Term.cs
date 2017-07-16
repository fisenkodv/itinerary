using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Autocomplete.Entities
{
  public class Term
  {
    [JsonProperty( "offset" )]
    public int Offset { get; set; }

    [JsonProperty( "value" )]
    public string Value { get; set; }
  }
}