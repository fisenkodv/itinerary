using Newtonsoft.Json;

namespace Itinerary.Crawler.TripAdviser.Entities
{
  public class CustomHover
  {
    [JsonProperty( "title" )]
    public string Title { get; set; }

    [JsonProperty( "url" )]
    public string Url { get; set; }

    [JsonProperty( "titleUrl")]
    public string TitleUrl { get; set; }
  }
}