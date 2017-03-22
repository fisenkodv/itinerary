using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Common.Entities
{
  public class LocationPoint
  {
    [JsonProperty( "lat" )]
    public double Langitude { get; set; }

    [JsonProperty( "lng" )]
    public double Longitude { get; set; }
  }
}