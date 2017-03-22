using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Api.Google;
using Itinerary.Business.Api.Google.Places;
using Itinerary.Business.Api.Google.Places.Autocomplete.ParameterBuilder;
using Itinerary.Business.Api.Google.Places.Autocomplete.Types;
using Itinerary.Business.Api.Google.Places.Details.Entities;
using Itinerary.Business.Api.Google.Places.Details.ParameterBuilder;
using Itinerary.Common;
using Itinerary.Common.Models;
using Itinerary.DataAccess.Domain;
using Itinerary.DataAccess.Repository.Interfaces;
using JetBrains.Annotations;
using Microsoft.Extensions.Caching.Memory;

namespace Itinerary.Business.Services.Places
{
  [UsedImplicitly]
  public class PlacesService : IPlacesService
  {
    private readonly GoogleClientSecrets _googleClientSecrets;
    private readonly IPlacesRepository _placesRepository;
    private readonly IMemoryCache _memoryCache;

    public PlacesService(
      GoogleClientSecrets googleClientSecrets,
      IPlacesRepository placesRepository,
      IMemoryCache memoryCache )
    {
      _googleClientSecrets = googleClientSecrets;
      _placesRepository = placesRepository;
      _memoryCache = memoryCache;
    }

    public IEnumerable<Place> Search( double lat, double lng, double radius, double rating )
    {
      return _placesRepository
        .Get( place => place.Rating >= rating )
        .Where(
          place => GeoCalculations.Distance( place.Location.Latitude, place.Location.Longitude, lat, lng ) <= radius );
    }

    public IEnumerable<Autocomplete> Autocomplete( string keyword )
    {
      string key = $"autosuggest_{keyword}";
      if ( !_memoryCache.TryGetValue( key, out IEnumerable<Autocomplete> autosuggestItems ) )
      {
        IAutocompleteHttpQueryBuilder
          autocompleteQueryBuilder =
            PlacesBuilder.Create( _googleClientSecrets )
                         .Autocomplete()
                         .Input( keyword )
                         .Types( PlaceTypes.Cities )
                         .Components( "us" );

        autosuggestItems = PlacesClient
          .Autocomplete( autocompleteQueryBuilder )
          .Result
          .Predictions
          .Select( x => new Autocomplete( x.PlaceId, x.Description ) );

        _memoryCache.Set( key, autosuggestItems );
      }

      return autosuggestItems;
    }

    public PlaceDetails Details( string placeId )
    {
      string key = $"details_{placeId}";
      if ( !_memoryCache.TryGetValue( key, out PlaceDetails placeDetails ) )
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

        placeDetails =
          new PlaceDetails( new Common.Models.Location( place.Geometry.Location.Langitude, place.Geometry.Location.Longitude ) );

        _memoryCache.Set( key, placeDetails );
      }

      return placeDetails;
    }
  }
}