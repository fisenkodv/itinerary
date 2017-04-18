using System.Collections.Generic;
using Itinerary.DataAccess.Domain;

namespace Itinerary.DataAccess.Entities
{
  public class Place : EntityBase
  {
    public string Name { get; set; }

    public float Rating { get; set; }

    public int Reviews { get; set; }

    public string Url { get; set; }

    public string ImgUrl { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public ICollection<PlacePlaceCategory> CategoriesLink { get; set; }
  }
}
