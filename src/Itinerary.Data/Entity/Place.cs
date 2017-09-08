using System.Collections.Generic;

namespace Itinerary.Data.Entity
{
  public class Place : EntityBase
  {
    public Place()
    {
      Categories = new List<PlacePlaceCategory>();
      Reviews = new List<Review>();
    }

    public string Name { get; set; }

    public double Rating { get; set; }

    //public int Reviews { get; set; }

    public string Url { get; set; }

    public string ImgUrl { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public ICollection<PlacePlaceCategory> Categories { get; set; }

    public ICollection<Review> Reviews { get; set; }
  }
}
