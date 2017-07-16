using Itinerary.ExternalApiClient.Google.Places.Common.Types;
using Itinerary.ExternalApiClient.Google.Places.Search.Types;
using Itinerary.ExternalApiClient.Google.QueryBuilder;

namespace Itinerary.ExternalApiClient.Google.Places.Search.ParameterBuilder.Interfaces
{
  /// <summary>
  ///   The Google Places API Text Search Service is a web service that returns information
  ///   about a set of places based on a string — for example "pizza in New York" or "shoe stores near Ottawa".
  ///   The service responds with a list of places matching the text string and any location bias that has been set.
  ///   The search response will include a list of places, you can send a Place Details request for more information
  ///   about any of the places in the response.
  /// </summary>
  public interface ITextHttpQueryBuilder : IHttpQueryBuilder
  {
    ITextHttpQueryBuilder Query( string query );

    ITextHttpQueryBuilder Location( double latitude, double longitude );

    ITextHttpQueryBuilder Radius( int radius );

    ITextHttpQueryBuilder Language( Languages language );

    ITextHttpQueryBuilder Price( int? minprice, int? maxprice );

    ITextHttpQueryBuilder PageToken( string pageToken );

    ITextHttpQueryBuilder Type( SearchTypes type );
  }
}
