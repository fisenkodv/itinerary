using System.Collections.Generic;
using System.Linq;
using Itinerary.Common.Entities;
using Itinerary.DataAccess.Interfaces;
using JetBrains.Annotations;

namespace Itinerary.Business.Places
{
  [UsedImplicitly]
  public class PlacesService : IPlacesService
  {
    private readonly IUnitOfWork _unitOfWork;

    public PlacesService( IUnitOfWork unitOfWork )
    {
      _unitOfWork = unitOfWork;
    }

    public IEnumerable<Place> Search( double lat, double lng, double radius, double rating )
    {
      return _unitOfWork
        .PlacesRepository
        .Get( place => place.Rating >= rating )
        .Where( place => GeoCodeCalc.CalcDistance( place.Location.Latitude, place.Location.Longitude, lat, lng ) <= radius );
    }
  }
}