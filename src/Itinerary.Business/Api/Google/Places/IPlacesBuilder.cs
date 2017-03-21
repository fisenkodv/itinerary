using Itinerary.Business.Api.Google.Places.Search.ParameterBuilder.Interfaces;

namespace Itinerary.Business.Api.Google.Places
{
  public interface IPlacesBuilder
  {
    INearbyHttpQueryBuilder NearbySearch();

    ITextHttpQueryBuilder TextSearch();

    IRadarHttpQueryBuilder RadarSearch();
  }
}