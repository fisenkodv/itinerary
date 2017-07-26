using System.Collections.Generic;
using Itinerary.Business.Models.Common;
using Itinerary.Business.Models.Places;

namespace Itinerary.Business.Places
{
  public interface IPlacesRepository
  {
    IEnumerable<Place> GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating );
  }

  public interface IReviewsRepository {
    IEnumerable<Review> GetReviews( int placeId );

    int AddReview( Review review );
  }
}
