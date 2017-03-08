using System.Collections.Generic;
using System.Linq;
using Itinerary.Common.Entities;
using Itinerary.DataAccess.Interfaces;

namespace Itinerary.Business.Places
{
  public class PlacesService : IPlacesService
  {
    private readonly IUnitOfWork _unitOfWork;

    public PlacesService( IUnitOfWork unitOfWork )
    {
      _unitOfWork = unitOfWork;
    }

    public IEnumerable<Place> Search( double lat, double lng, double radius )
    {
      return _unitOfWork.PlacesRepository
        .Get( _ => true )
        .Where( place => GeoCodeCalc.CalcDistance( place.Location.Latitude, place.Location.Longitude, lat, lng ) <= radius );
    }
  }
}