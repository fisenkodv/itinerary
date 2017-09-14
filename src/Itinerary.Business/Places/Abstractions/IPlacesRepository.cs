using System.Collections.Generic;
using Itinerary.Business.Places.Models;

namespace Itinerary.Business.Places.Abstractions
{
  public interface IPlacesRepository
  {
    IEnumerable<Place> GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating);
  }

  public interface IReviewsRepository
  {
    IEnumerable<Review> GetReviews(int placeId);

    int AddReview(Review review);
  }
}
