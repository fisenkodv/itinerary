using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Common.Entities
{
  public class LocationPoint
  {
    [JsonProperty(propertyName: "lat")]
    public double Latitude { get; set; }

    [JsonProperty(propertyName: "lng")]
    public double Longitude { get; set; }
  }
}
