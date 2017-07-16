using System;
using System.Collections.Generic;
using Itinerary.Business.Itinerary.GooglePlaces.Dto;
using Itinerary.Business.Itinerary.Places.Dto;
using Microsoft.Extensions.Caching.Memory;

namespace Itinerary.Business.Itinerary.GooglePlaces
{
  public class GooglePlacesService : IGooglePlacesService
  {
    private readonly IGoogleApiClient _googleApiClient;
    private readonly IMemoryCache _memoryCache;

    public GooglePlacesService(
      IGoogleApiClient googleApiClient,
      IMemoryCache memoryCache )
    {
      _googleApiClient = googleApiClient;
      _memoryCache = memoryCache;
    }

    private T GetFromCache<T>( string key, Func<T> getDataAction )
    {
      if ( !_memoryCache.TryGetValue( key, value: out T data ) )
      {
        data = getDataAction();
        _memoryCache.Set( key, data );
      }

      return data;
    }

    public IEnumerable<Autocomplete> Autocomplete( string keyword )
    {
      return GetFromCache(
        key: $"autosuggest_{keyword}",
        getDataAction: () => { return _googleApiClient.Autocomplete( keyword ); } );
    }

    public Location Location( string placeId )
    {
      return GetFromCache(
        key: $"location_{placeId}",
        getDataAction: () => { return _googleApiClient.Location( placeId ); } );
    }
  }
}
