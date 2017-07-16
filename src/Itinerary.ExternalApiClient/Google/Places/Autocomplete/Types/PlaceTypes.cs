using Itinerary.ExternalApiClient.Google.Attributes;

namespace Itinerary.ExternalApiClient.Google.Places.Autocomplete.Types
{
  public enum PlaceTypes
  {
    /// <summary>
    ///   Instructs the Place Autocomplete service to return only geocoding results,
    ///   rather than business results. Generally, you use this request to disambiguate
    ///   results where the location specified may be indeterminate.
    /// </summary>
    [Code( code: "geocode" )] Geocode,

    /// <summary>
    ///   Instructs the Place Autocomplete service to return only geocoding results with
    ///   a precise address. Generally, you use this request when you know the user
    ///   will be looking for a fully specified address.
    /// </summary>
    [Code( code: "address" )] Address,

    /// <summary>
    ///   Instructs the Place Autocomplete service to return only business results.
    /// </summary>
    [Code( code: "establishment" )] Establishment,

    /// <summary>
    ///   Instructs the Places service to return any result matching the following types:
    ///   locality, sublocality, postal_code, country, administrative_area_level_1, administrative_area_level_2
    /// </summary>
    [Code( code: "(regions)" )] Regions,

    /// <summary>
    ///   Instructs the Places service to return results that match locality or administrative_area_level_3
    /// </summary>
    [Code( code: "(cities)" )] Cities
  }
}
