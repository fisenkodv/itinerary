using System;
using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Business.Places.Models;
using Itinerary.GoogleApiClient.Places;
using Itinerary.GoogleApiClient.Places.Autocomplete.ParameterBuilder;
using Itinerary.GoogleApiClient.Places.Autocomplete.Types;
using Itinerary.GoogleApiClient.Places.Details.Entities;
using Itinerary.GoogleApiClient.Places.Details.ParameterBuilder;
using Microsoft.Extensions.Caching.Memory;

namespace Itinerary.GoogleApiClient
{
  public class GooglePlacesClient : IGooglePlacesClient
  {
    private readonly IMemoryCache _memoryCache;
    private readonly GoogleClientSecrets _googleClientSecrets;

    public GooglePlacesClient(
      IMemoryCache memoryCache,
      GoogleClientSecrets googleClientSecrets)
    {
      _memoryCache = memoryCache;
      _googleClientSecrets = googleClientSecrets;
    }

    public IEnumerable<PlaceLocation> GetPlaces(string keyword)
    {
      return GetFromCache(
        key: $"autosuggest_{keyword}",
        getDataAction: () =>
                       {
                         IAutocompleteHttpQueryBuilder
                           autocompleteQueryBuilder =
                             PlacesBuilder.Create(_googleClientSecrets)
                                          .Autocomplete()
                                          .Input(keyword)
                                          .Types(PlaceTypes.Cities)
                                          .Components("us");

                         return PlacesClient
                           .Autocomplete(autocompleteQueryBuilder)
                           .Result
                           .Predictions
                           .AsParallel()
                           .Select(x => new PlaceLocation(x.Description, GetLocation(x.PlaceId)));
                       });
    }

    private Location GetLocation(string placeId)
    {
      return GetFromCache(
        key: $"location_{placeId}",
        getDataAction: () =>
                       {
                         IDetailsHttpQueryBuilder
                           detailsHttpQueryBuilder =
                             PlacesBuilder.Create(_googleClientSecrets)
                                          .Details()
                                          .Place(placeId);

                         Result place = PlacesClient
                           .Details(detailsHttpQueryBuilder)
                           .Result
                           .Result;

                         return new Location(place.Geometry.Location.Latitude, place.Geometry.Location.Longitude);
                       });
    }

    private T GetFromCache<T>(string key, Func<T> getDataAction)
    {
      if (_memoryCache.TryGetValue(key, value: out T data)) return data;
      data = getDataAction();
      _memoryCache.Set(key, data);

      return data;
    }
  }
}
