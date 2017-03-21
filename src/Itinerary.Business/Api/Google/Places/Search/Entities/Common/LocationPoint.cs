using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Search.Entities.Common
{
  public class LocationPoint
  {
    [JsonProperty( "lat" )]
    public double Langitude { get; set; }

    [JsonProperty( "lng" )]
    public double Longitude { get; set; }
  }
}