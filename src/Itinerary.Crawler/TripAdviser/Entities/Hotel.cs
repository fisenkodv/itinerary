using Newtonsoft.Json;

namespace Itinerary.Crawler.TripAdviser.Entities
{
  public class Hotel
  {
    [JsonProperty( "lat" )]
    public double Lat { get; set; }

    [JsonProperty( "lng" )]
    public double Lng { get; set; }

    [JsonProperty( "locId" )]
    public int LocId { get; set; }

    [JsonProperty( "url" )]
    public string Url { get; set; }

    [JsonProperty( "overviewWeight" )]
    public double OverviewWeight { get; set; }

    [JsonProperty( "accommodationCategory" )]
    public int AccommodationCategory { get; set; }

    [JsonProperty( "customHover" )]
    public CustomHover CustomHover { get; set; }

    [JsonProperty( "pinProminent" )]
    public bool PinProminent { get; set; }
  }
}