using System.Collections.Generic;

namespace Itinerary.Business.Places.Models
{
  public class Place
  {
    public Place()
    {
      Categories = new List<Category>();
    }

    public long PlaceId { get; set; }

    public string Name { get; set; }

    public int Reviews { get; set; }

    public double Rating { get; set; }

    public string ImageUrl { get; set; }

    public Location Location { get; set; }

    public List<Category> Categories { get; set; }
  }
}
