using Itinerary.ExternalApiClient.Google.Places.Search.ParameterBuilder.Interfaces;

namespace Itinerary.ExternalApiClient.Google.Places
{
  public interface IPlacesBuilder
  {
    INearbyHttpQueryBuilder NearbySearch();

    ITextHttpQueryBuilder TextSearch();

    IRadarHttpQueryBuilder RadarSearch();
  }
}
