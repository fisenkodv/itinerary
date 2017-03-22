using System.Collections.Generic;
using Itinerary.Common.Models;
using Itinerary.DataAccess.Domain;

namespace Itinerary.Business.Services.Places
{
  public interface IPlacesService
  {
    IEnumerable<Place> Search( double lat, double lng, double radius, double rating );

    IEnumerable<Autocomplete> Autocomplete( string keyword );

    PlaceDetails Details( string placeId );
  }
}