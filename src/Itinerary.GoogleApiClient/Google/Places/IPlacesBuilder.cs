using Itinerary.GoogleApiClient.Google.Places.Search.ParameterBuilder.Interfaces;

namespace Itinerary.GoogleApiClient.Google.Places
{
  public interface IPlacesBuilder
  {
    INearbyHttpQueryBuilder NearbySearch();

    ITextHttpQueryBuilder TextSearch();

    IRadarHttpQueryBuilder RadarSearch();
  }
}
