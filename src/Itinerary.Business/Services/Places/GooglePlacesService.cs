using System;
using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Api.Google;
using Itinerary.Business.Api.Google.Places;
using Itinerary.Business.Api.Google.Places.Autocomplete.ParameterBuilder;
using Itinerary.Business.Api.Google.Places.Autocomplete.Types;
using Itinerary.Business.Api.Google.Places.Details.Entities;
using Itinerary.Business.Api.Google.Places.Details.ParameterBuilder;
using Itinerary.Common.Models;
using Microsoft.Extensions.Caching.Memory;

namespace Itinerary.Business.Services.Places
{
  public class GooglePlacesService : IGooglePlacesService
  {
    private readonly GoogleClientSecrets _googleClientSecrets;
    private readonly IMemoryCache _memoryCache;

    public GooglePlacesService(
      GoogleClientSecrets googleClientSecrets,
      IMemoryCache memoryCache )
    {
      _googleClientSecrets = googleClientSecrets;
      _memoryCache = memoryCache;
    }

    public IEnumerable<Autocomplete> Autocomplete( string keyword )
    {
      string key = $"autosuggest_{keyword}";
      return GetFromCache(
        key,
        () =>
        {
          IAutocompleteHttpQueryBuilder
            autocompleteQueryBuilder =
              PlacesBuilder.Create( _googleClientSecrets )
                           .Autocomplete()
                           .Input( keyword )
                           .Types( PlaceTypes.Cities )
                           .Components( "us" );

          return PlacesClient
            .Autocomplete( autocompleteQueryBuilder )
            .Result
            .Predictions
            .Select( x => new Autocomplete( x.PlaceId, x.Description ) );
        } );
    }

    public Location Location( string placeId )
    {
      string key = $"location_{placeId}";
      return GetFromCache(
        key,
        () =>
        {
          IDetailsHttpQueryBuilder
            detailsHttpQueryBuilder =
              PlacesBuilder.Create( _googleClientSecrets )
                           .Details()
                           .Place( placeId );

          Result place = PlacesClient
            .Details( detailsHttpQueryBuilder )
            .Result
            .Result;

          return new Location( place.Geometry.Location.Latitude, place.Geometry.Location.Longitude );
        } );
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
