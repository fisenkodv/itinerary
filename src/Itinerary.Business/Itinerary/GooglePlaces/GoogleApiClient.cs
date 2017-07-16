using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Api.Google;
using Itinerary.Business.Api.Google.Places;
using Itinerary.Business.Api.Google.Places.Autocomplete.ParameterBuilder;
using Itinerary.Business.Api.Google.Places.Autocomplete.Types;
using Itinerary.Business.Api.Google.Places.Details.Entities;
using Itinerary.Business.Api.Google.Places.Details.ParameterBuilder;
using Itinerary.Common.Models;
using Itinerary.Common.Models.Google;

namespace Itinerary.Business.Services.Places
{
  public class GoogleApiClient : IGoogleApiClient
  {
    private readonly GoogleClientSecrets _googleClientSecrets;

    public GoogleApiClient( GoogleClientSecrets googleClientSecrets )
    {
      _googleClientSecrets = googleClientSecrets;
    }

    public IEnumerable<Autocomplete> Autocomplete( string keyword )
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
    }

    public Location Location( string placeId )
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
    }
  }
}