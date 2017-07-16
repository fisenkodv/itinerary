using System.Collections.Generic;
using Itinerary.Business.Common.Models;
using Itinerary.Business.Itinerary.Places.Model;

namespace Itinerary.Business.Itinerary.Places
{
  public interface IPlacesRepository
  {
    IEnumerable<Place> GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating,
      int reviewsCount );
  }
}
