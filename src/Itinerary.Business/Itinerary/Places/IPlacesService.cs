using System.Collections.Generic;
using Itinerary.Business.Itinerary.Places.Model;

namespace Itinerary.Business.Itinerary.Places
{
  public interface IPlacesService
  {
    IEnumerable<Place> Search(
      double latitude,
      double longitude,
      double distance,
      double rating,
      int reviews );
  }
}
