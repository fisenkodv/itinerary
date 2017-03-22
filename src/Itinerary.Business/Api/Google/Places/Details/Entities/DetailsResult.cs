using Itinerary.Business.Api.Google.Places.Autocomplete.Entities;
using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Details.Entities
{
  public class DetailsResult
  {
    [JsonProperty( "result" )]
    public Result Result { get; set; }

    [JsonProperty( "status" )]
    public string Status { get; set; }
  }
}