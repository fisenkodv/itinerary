using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Models.Common;

namespace Itinerary.Business.Places.Dto
{
  public class PlaceDto
  {
    public PlaceDto(
      string name,
      double rating,
      int reviews,
      IEnumerable<string> categories,
      string imageUrl,
      Location location )
    {
      Name = name;
      Rating = rating;
      Reviews = reviews;
      Categories = categories?.ToList().AsReadOnly();
      ImageUrl = imageUrl;
      Location = location;
    }

    public string Name { get; }

    public double Rating { get; }

    public int Reviews { get; }

    public IReadOnlyList<string> Categories { get; }

    public string ImageUrl { get; }

    public Location Location { get; }
  }
}
