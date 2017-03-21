using Itinerary.Business.Api.Google.Places.Search.Types;
using Itinerary.Business.Api.Google.Places.Types;
using Itinerary.Business.Api.Google.QueryBuilder;

namespace Itinerary.Business.Api.Google.Places.Search.ParameterBuilder.Interfaces
{
  /// <summary>
  ///   The Google Places API Radar Search Service allows you to search for up to 200 places at once,
  ///   but with less detail than is typically returned from a Text Search or Nearby Search request.
  ///   With Radar Search, you can create applications that help users identify specific areas of interest within a
  ///   geographic area.
  /// </summary>
  public interface IRadarHttpQueryBuilder : IHttpQueryBuilder
  {
    IRadarHttpQueryBuilder Location( double latitude, double longitude );

    IRadarHttpQueryBuilder Radius( int radius );

    IRadarHttpQueryBuilder Keyword( string keyword );

    IRadarHttpQueryBuilder Language( Languages language );

    IRadarHttpQueryBuilder Price( int? minprice, int? maxprice );

    IRadarHttpQueryBuilder Names( params string[] names );

    IRadarHttpQueryBuilder Type( SearchTypes type );
  }
}