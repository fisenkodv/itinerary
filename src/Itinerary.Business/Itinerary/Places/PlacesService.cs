using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Common.Models;
using Itinerary.Business.Itinerary.Places.Model;
using Itinerary.Common;
using JetBrains.Annotations;

namespace Itinerary.Business.Itinerary.Places
{
  [UsedImplicitly]
  public class PlacesService : IPlacesService
  {
    private readonly IUnitOfWork _unitOfWork;

    public PlacesService( IUnitOfWork unitOfWork )
    {
      _unitOfWork = unitOfWork;
    }

    public IEnumerable<Place> Search( double latitude, double longitude, double distance, double rating, int reviews )
    {
      (Location northWestLocation, Location southEastLocation, GeoLocation baseLocation) locationInfo =
        GetLocationInfo( latitude, longitude, distance );

      IEnumerable<Place> places =
        from place in _unitOfWork.PlacesRepository.GetPlaces(
          locationInfo.northWestLocation,
          locationInfo.southEastLocation,
          rating, reviews )
        let distanceFromBasePoint = locationInfo.baseLocation.DistanceTo(
          location: GeoLocation.FromDegrees(
            place.Location.Latitude,
            place.Location.Longitude ),
          locationMeasurement: GeoLocationMeasurement.Miles )
        where distanceFromBasePoint <= distance
        select place;

      return places;
    }

    private static (Location northWestLocation, Location southEastLocation, GeoLocation baseLocation) GetLocationInfo(
      double latitude,
      double longitude,
      double distance )
    {
      GeoLocation baseGeoLocation = GeoLocation.FromDegrees( latitude, longitude );
      GeoLocation[] edgeCoordinates = baseGeoLocation.BoundingCoordinates( distance, GeoLocationMeasurement.Miles );

      var northWestLocation = new Location(
        latitude: edgeCoordinates[ 1 ].GetLatitudeInDegrees(),
        longitude: edgeCoordinates[ 0 ].GetLongitudeInDegrees() );
      var southEastLocation = new Location(
        latitude: edgeCoordinates[ 0 ].GetLatitudeInDegrees(),
        longitude: edgeCoordinates[ 1 ].GetLongitudeInDegrees() );

      return (northWestLocation, southEastLocation, baseGeoLocation);
    }
  }
}
