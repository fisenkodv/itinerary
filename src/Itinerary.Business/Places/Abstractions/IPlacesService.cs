using System.Collections.Generic;
using Itinerary.Business.Places.Models;

namespace Itinerary.Business.Places.Abstractions
{
  public interface IPlacesService
  {
    IEnumerable<Place> Search(
      Location location,
      double distance,
      double rating);

    IEnumerable<PlaceLocation> Search(string keyword);
  }
}
