using System.Collections.Generic;

namespace Itinerary.Data.Entity
{
  public class PlaceCategory : EntityBase
  {
    public PlaceCategory()
    {
      Places = new List<PlacePlaceCategory>();
    }

    public string Name { get; set; }

    public ICollection<PlacePlaceCategory> Places { get; set; }
  }
}
