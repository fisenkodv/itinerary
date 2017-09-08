using Itinerary.GoogleApiClient.Places.Search.ParameterBuilder.Interfaces;

namespace Itinerary.GoogleApiClient.Places
{
  public interface IPlacesBuilder
  {
    INearbyHttpQueryBuilder NearbySearch();

    ITextHttpQueryBuilder TextSearch();

    IRadarHttpQueryBuilder RadarSearch();
  }
}
