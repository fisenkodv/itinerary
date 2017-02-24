using System.Collections.Generic;
using Newtonsoft.Json;

namespace Itinerary.Crawler.TripAdviser.Entities
{
  public class Map
  {
    [JsonProperty( "hotels" )]
    public IList<Hotel> Hotels { get; set; }

    [JsonProperty( "restaurants" )]
    public IList<Restaurant> Restaurants { get; set; }

    [JsonProperty( "attractions" )]
    public IList<Attraction> Attractions { get; set; }

    [JsonProperty( "vacationrentals" )]
    public IList<object> Vacationrentals { get; set; }

    [JsonProperty( "hotelsVisible" )]
    public bool HotelsVisible { get; set; }

    [JsonProperty( "disneyVisible" )]
    public bool DisneyVisible { get; set; }

    [JsonProperty( "sponsorVisible" )]
    public bool SponsorVisible { get; set; }

    [JsonProperty( "addressInfo" )]
    public AddressInfo AddressInfo { get; set; }

    [JsonProperty( "homeSponsored" )]
    public bool HomeSponsored { get; set; }

    [JsonProperty( "filterState" )]
    public FilterState FilterState { get; set; }
  }
}