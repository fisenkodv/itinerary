using System.Collections.Generic;
using Itinerary.Business.Itinerary.Places.Model;
using Itinerary.Common.Models;

namespace Itinerary.Business.Services.Places
{
  public interface IPlacesService
  {
    IEnumerable<Place> Search(
      double latitude,
      double longitude,
      double distance,
      double rating,
      int reviews );
  }
}
