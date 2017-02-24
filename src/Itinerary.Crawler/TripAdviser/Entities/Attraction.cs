using Newtonsoft.Json;

namespace Itinerary.Crawler.TripAdviser.Entities
{
  public class Attraction
  {
    [JsonProperty("lat")]
    public double Lat { get; set; }

    [JsonProperty("lng")]
    public double Lng { get; set; }

    [JsonProperty("locId")]
    public int LocId { get; set; }

    [JsonProperty("url")]
    public string Url { get; set; }

    [JsonProperty("overviewWeight")]
    public double OverviewWeight { get; set; }

    [JsonProperty("accommodationCategory")]
    public int AccommodationCategory { get; set; }

    [JsonProperty("customHover")]
    public CustomHover CustomHover { get; set; }

    [JsonProperty("pinProminent")]
    public bool PinProminent { get; set; }

    [JsonProperty("imgUrl")]
    public string ImgUrl { get; set; }

    [JsonProperty("rating")]
    public float Rating { get; set; }

    [JsonProperty("reviews")]
    public int Reviews { get; set; }

    [JsonProperty("categories")]
    public string[] Categories { get; set; }

    public override bool Equals(object obj)
    {
      var attraction = obj as Attraction;
      if (attraction == null) return false;
      return attraction.Url == Url;
    }

    public override int GetHashCode()
    {
      return Url.GetHashCode();
    }
  }
}