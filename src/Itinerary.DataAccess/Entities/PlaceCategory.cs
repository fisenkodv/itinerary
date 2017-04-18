using System.Collections.Generic;
using Itinerary.DataAccess.Domain;

namespace Itinerary.DataAccess.Entities
{
  public class PlaceCategory : EntityBase
  {
    public string Name { get; set; }

    public ICollection<PlacePlaceCategory> PlacesLink { get; set; }
  }
}
