using Itinerary.Business.Places.Abstractions;

namespace Itinerary.Business.Places
{
  /// <summary>
  /// https://ru.wikipedia.org/wiki/250_лучших_фильмов_по_версии_IMDb
  /// https://www.kinopoisk.ru/top/
  /// </summary>
  public class DefaultRatingCalculator : IRatingCalculator
  {
    private readonly double _allPlacesReviewsAverage;
    private const int M = 100;

    public DefaultRatingCalculator( double allPlacesReviewsAverage )
    {
      _allPlacesReviewsAverage = allPlacesReviewsAverage;
    }

    public double GetRating( double placeReviewAverage, int placeReviewsCount )
    {
      return placeReviewsCount / ( ( double ) placeReviewsCount + M ) * placeReviewAverage +
             M / ( ( double ) placeReviewsCount + M ) * _allPlacesReviewsAverage;
    }
  }
}
