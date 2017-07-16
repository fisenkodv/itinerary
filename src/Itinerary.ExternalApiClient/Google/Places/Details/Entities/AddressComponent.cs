using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Details.Entities
{
  public class AddressComponent
  {
    [JsonProperty( "long_name" )]
    public string LongName { get; set; }

    [JsonProperty( "short_name" )]
    public string ShortNmae { get; set; }

    [JsonProperty( "types" )]
    public string[] Types { get; set; }
  }
}