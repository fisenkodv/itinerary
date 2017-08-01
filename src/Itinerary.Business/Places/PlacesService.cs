using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Business.Places.Models;
using Itinerary.Common;
using JetBrains.Annotations;

namespace Itinerary.Business.Places
{
  [UsedImplicitly]
  public class PlacesService : IPlacesService
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IGooglePlacesClient _googlePlacesClient;

    public PlacesService( IUnitOfWork unitOfWork, IGooglePlacesClient googlePlacesClient )
    {
      _unitOfWork = unitOfWork;
      _googlePlacesClient = googlePlacesClient;
    }

    public IEnumerable<Place> Search( Location location, double distance, double rating )
    {
      (Location northWestLocation, Location southEastLocation, GeoLocation baseLocation) locationInfo =
        GetLocationInfo( location.Latitude, location.Longitude, distance );

      IEnumerable<Place> places =
        from place in _unitOfWork.PlacesRepository.GetPlaces(
          locationInfo.northWestLocation,
          locationInfo.southEastLocation,
          rating )
        let distanceFromBasePoint = locationInfo.baseLocation.DistanceTo(
          location: GeoLocation.FromDegrees(
            place.Location.Latitude,
            place.Location.Longitude ),
          locationMeasurement: GeoLocationMeasurement.Miles )
        where distanceFromBasePoint <= distance
        select place;

      return places;
    }

    public IEnumerable<PlaceLocation> Search( string keyword )
    {
      return _googlePlacesClient.GetPlaces( keyword );
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
