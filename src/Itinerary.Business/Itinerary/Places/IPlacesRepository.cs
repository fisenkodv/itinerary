using System.Collections;
using System.Collections.Generic;
using Itinerary.Business.Itinerary.Places.Model;
using Itinerary.Common.Models;

namespace Itinerary.DataAccess.Abstract.Repository
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
