using System;
using System.Collections.Generic;
using Itinerary.Common.Models;
using Itinerary.Common.Models.Google;
using Microsoft.Extensions.Caching.Memory;

namespace Itinerary.Business.Services.Places
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

    public IEnumerable<Autocomplete> Autocomplete( string keyword )
    {
      return GetFromCache(
        $"autosuggest_{keyword}",
        () => { return _googleApiClient.Autocomplete( keyword ); } );
    }

    public Location Location( string placeId )
    {
      return GetFromCache(
        $"location_{placeId}",
        () => { return _googleApiClient.Location( placeId ); } );
    }

    private T GetFromCache<T>( string key, Func<T> getDataAction )
    {
      if ( !_memoryCache.TryGetValue( key, out T data ) )
      {
        data = getDataAction();
        _memoryCache.Set( key, data );
      }

      return data;
    }
  }
}
