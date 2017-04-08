using System.Collections.Generic;
using System.Linq;
using Itinerary.Common;
using Itinerary.Common.Models;
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

    public IEnumerable<PlaceDetails> Search( double lat, double lng, double distance, double rating, int reviews )
    {
      GeoLocation baseLocation = GeoLocation.FromDegrees( lat, lng );
      GeoLocation[] coordinates = baseLocation.BoundingCoordinates( distance, GeoLocationMeasurement.Miles );

      double north = coordinates[ 1 ].GetLatitudeInDegrees();
      double south = coordinates[ 0 ].GetLatitudeInDegrees();
      double east = coordinates[ 1 ].GetLongitudeInDegrees();
      double west = coordinates[ 0 ].GetLongitudeInDegrees();

      return from place in _placesRepository.Get(
               place => place.Rating >= rating &&
                        place.Reviews >= reviews &&
                        ( place.Location.Latitude <= north && place.Location.Latitude >= south ) &&
                        ( place.Location.Longitude <= east && place.Location.Longitude >= west ) )
             let distanceFromBasePoint = baseLocation.DistanceTo(
               GeoLocation.FromDegrees( place.Location.Latitude, place.Location.Longitude ),
               GeoLocationMeasurement.Miles )
             where distanceFromBasePoint <= distance
             select
             new PlaceDetails(
               place.Name, place.Rating, place.Reviews, place.Categories, place.Url, place.ImgUrl,
               new Common.Models.Location( place.Location.Latitude, place.Location.Longitude ) );
    }
  }
}
