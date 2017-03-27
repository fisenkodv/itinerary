using System.Collections.Generic;
using System.Linq;
using Itinerary.Common;
using Itinerary.DataAccess.Domain;
using Itinerary.DataAccess.Repository.Interfaces;
using JetBrains.Annotations;

namespace Itinerary.Business.Services.Places
{
  [UsedImplicitly]
  public class PlacesService : IPlacesService
  {
    private readonly IPlacesRepository _placesRepository;

    public PlacesService( IPlacesRepository placesRepository )
    {
      _placesRepository = placesRepository;
    }

    public IEnumerable<Place> Search( double lat, double lng, double distance, double rating )
    {
      return _placesRepository
        .Get( place => place.Rating >= rating )
        .Where(
          place => GeoCalculations.Distance( place.Location.Latitude, place.Location.Longitude, lat, lng ) <= distance );
    }
  }
}
