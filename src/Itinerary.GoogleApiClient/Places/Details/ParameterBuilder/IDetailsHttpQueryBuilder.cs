using Itinerary.GoogleApiClient.Places.Common.Types;
using Itinerary.GoogleApiClient.QueryBuilder;

namespace Itinerary.GoogleApiClient.Places.Details.ParameterBuilder
{
  /// <summary>
  ///   Once you have a place_id or a reference from a Place Search, you can request more details about a particular
  ///   establishment or point of interest by initiating a Place Details request. A Place Details request returns more
  ///   comprehensive information about the indicated place such as its complete address, phone number, user rating and
  ///   reviews.
  /// </summary>
  public interface IDetailsHttpQueryBuilder : IHttpQueryBuilder
  {
    /// <summary>
    ///   A textual identifier that uniquely identifies a place, returned from a Place Search.
    /// </summary>
    IDetailsHttpQueryBuilder Place(string placeId);

    /// <summary>
    ///   A textual identifier that uniquely identifies a place, returned from a Place Search.
    ///   Note: The reference is now deprecated in favor of placeid.
    /// </summary>
    IDetailsHttpQueryBuilder Reference(string reference);

    /// <summary>
    ///   The language code, indicating in which language the results should be returned, if possible.
    ///   Note that some fields may not be available in the requested language.
    /// </summary>
    /// <param name="language"></param>
    /// <returns></returns>
    IDetailsHttpQueryBuilder Language(Languages language);
  }
}
