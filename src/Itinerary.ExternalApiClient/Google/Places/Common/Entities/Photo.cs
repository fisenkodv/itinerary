using Newtonsoft.Json;

namespace Itinerary.ExternalApiClient.Google.Places.Common.Entities
{
  public class Photo
  {
    [JsonProperty( propertyName: "height" )]
    public int Height { get; set; }

    [JsonProperty( propertyName: "html_attributions" )]
    public string[] HtmlAttributions { get; set; }

    [JsonProperty( propertyName: "photo_reference" )]
    public string PhotoReference { get; set; }

    [JsonProperty( propertyName: "width" )]
    public int Width { get; set; }
  }
}
