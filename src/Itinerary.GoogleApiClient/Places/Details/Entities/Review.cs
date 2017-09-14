using Newtonsoft.Json;

namespace Itinerary.GoogleApiClient.Places.Details.Entities
{
  public class Review
  {
    [JsonProperty(propertyName: "aspects")]
    public Aspect[] Aspects { get; set; }

    [JsonProperty(propertyName: "author_name")]
    public string AuthorName { get; set; }

    [JsonProperty(propertyName: "author_url")]
    public string AuthorUrl { get; set; }

    [JsonProperty(propertyName: "language")]
    public string Language { get; set; }

    [JsonProperty(propertyName: "profile_photo_url")]
    public string ProfilePhotoUrl { get; set; }

    [JsonProperty(propertyName: "rating")]
    public int Rating { get; set; }

    [JsonProperty(propertyName: "relative_time_description")]
    public string RelativeTimeDescription { get; set; }

    [JsonProperty(propertyName: "text")]
    public string Text { get; set; }

    [JsonProperty(propertyName: "time")]
    public int Time { get; set; }
  }
}
