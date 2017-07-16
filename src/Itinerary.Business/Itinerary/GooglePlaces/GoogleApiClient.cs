using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Itinerary.GooglePlaces.Dto;
using Itinerary.Business.Itinerary.Places.Dto;
using Itinerary.ExternalApiClient.Google;
using Itinerary.ExternalApiClient.Google.Places;
using Itinerary.ExternalApiClient.Google.Places.Autocomplete.ParameterBuilder;
using Itinerary.ExternalApiClient.Google.Places.Autocomplete.Types;
using Itinerary.ExternalApiClient.Google.Places.Details.Entities;
using Itinerary.ExternalApiClient.Google.Places.Details.ParameterBuilder;

namespace Itinerary.Business.Itinerary.GooglePlaces
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
