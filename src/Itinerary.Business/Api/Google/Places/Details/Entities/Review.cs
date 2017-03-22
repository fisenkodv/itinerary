using Newtonsoft.Json;

namespace Itinerary.Business.Api.Google.Places.Details.Entities
{
  public class Review
  {
    [JsonProperty("aspects")]
    public Aspect[] Aspects { get; set; }

    [JsonProperty( "author_name" )]
    public string AuthorName { get; set; }

    [JsonProperty( "author_url" )]
    public string AuthorUrl { get; set; }

    [JsonProperty( "language" )]
    public string Language { get; set; }

    [JsonProperty( "profile_photo_url" )]
    public string ProfilePhotoUrl { get; set; }

    [JsonProperty( "rating" )]
    public int Rating { get; set; }

    [JsonProperty( "relative_time_description" )]
    public string RelativeTimeDescription { get; set; }

    [JsonProperty( "text" )]
    public string Text { get; set; }

    [JsonProperty( "time" )]
    public int Time { get; set; }
  }
}