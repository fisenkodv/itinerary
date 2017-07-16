using System.Collections.Generic;
using Itinerary.Business.Itinerary.GooglePlaces.Dto;
using Itinerary.Business.Itinerary.Places.Dto;

namespace Itinerary.Business.Itinerary.GooglePlaces
{
  public interface IGooglePlacesService
  {
    IEnumerable<Autocomplete> Autocomplete( string keyword );

    Location Location( string placeId );
  }
}
