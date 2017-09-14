namespace Itinerary.Business.Places.Abstractions
{
  public interface IRatingCalculator
  {
    double GetRating(double placeReviewAverage, int placeReviewsCount);
  }
}
