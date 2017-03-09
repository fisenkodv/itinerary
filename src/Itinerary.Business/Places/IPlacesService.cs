using System.Collections.Generic;
using Itinerary.Common.Entities;

namespace Itinerary.Business.Places
{
  public interface IPlacesService
  {
    IEnumerable<Place> Search( double lat, double lng, double radius, double rating );
  }
}