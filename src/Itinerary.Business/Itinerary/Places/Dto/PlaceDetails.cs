using System.Collections.Generic;

namespace Itinerary.Business.Itinerary.Places.Dto
{
  public class PlaceDetails
  {
    public PlaceDetails(
      string name,
      double rating,
      int reviews,
      IEnumerable<string> categories,
      string url,
      string imgUrl,
      Location location )
    {
      Name = name;
      Rating = rating;
      Reviews = reviews;
      Categories = categories;
      Url = url;
      ImgUrl = imgUrl;
      Location = location;
    }

    public string Name { get; }

    public double Rating { get; }

    public int Reviews { get; }

    public IEnumerable<string> Categories { get; }

    public string Url { get; set; }

    public string ImgUrl { get; }

    public Location Location { get; }
  }
}
