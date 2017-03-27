using System.Collections.Generic;
using Itinerary.DataAccess.Domain;

namespace Itinerary.Business.Services.Places
{
  public interface IPlacesService
  {
    IEnumerable<Place> Search( double lat, double lng, double distance, double rating );
  }
}
