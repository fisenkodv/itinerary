using System.Collections.Generic;
using System.Linq;
using Itinerary.Common;
using Itinerary.Common.Models;
using Itinerary.DataAccess.Abstract.UnitOfWork;
using Itinerary.DataAccess.Entities;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.Business.Services.Places
{
  [UsedImplicitly]
  public class PlacesService : IPlacesService
  {
    private readonly IUnitOfWork _unitOfWork;

    public PlacesService( IUnitOfWork unitOfWork )
    {
      _unitOfWork = unitOfWork;
    }

    public IEnumerable<PlaceDetails> Search( double lat, double lng, double distance, double rating, int reviews )
    {
      GeoLocation baseLocation = GeoLocation.FromDegrees( lat, lng );
      GeoLocation[] coordinates = baseLocation.BoundingCoordinates( distance, GeoLocationMeasurement.Miles );

      double north = coordinates[ 1 ].GetLatitudeInDegrees();
      double south = coordinates[ 0 ].GetLatitudeInDegrees();
      double east = coordinates[ 1 ].GetLongitudeInDegrees();
      double west = coordinates[ 0 ].GetLongitudeInDegrees();

      return from place in _unitOfWork.PlacesRepository.Get(
               place => place.Rating >= rating &&
                        place.Reviews >= reviews &&
                        place.Latitude <= north && place.Latitude >= south &&
                        place.Longitude <= east && place.Longitude >= west,
               null,
               query => query.Include( place => place.Categories )
                             .ThenInclude(
                               placePlaceCategory => placePlaceCategory.Category ) )
             let distanceFromBasePoint = baseLocation.DistanceTo(
               GeoLocation.FromDegrees( place.Latitude, place.Longitude ),
               GeoLocationMeasurement.Miles )
             where distanceFromBasePoint <= distance
             let categories = from category in place.Categories ?? Enumerable.Empty<PlacePlaceCategory>()
                              select category.Category.Name
             select new PlaceDetails(
               place.Name,
               place.Rating,
               place.Reviews,
               categories,
               place.Url,
               place.ImgUrl,
               new Location( place.Latitude, place.Longitude ) );
    }
  }
}
