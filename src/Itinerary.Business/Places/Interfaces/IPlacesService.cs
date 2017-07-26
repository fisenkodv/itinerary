using System.Collections.Generic;
using Itinerary.Business.Models.Common;
using Itinerary.Business.Models.Places;

namespace Itinerary.Business.Places.Interfaces
{
  public interface IPlacesService
  {
    IEnumerable<Place> Search(
      Location location,
      double distance,
      double rating );

    IEnumerable<PlaceLocation> Search( string keyword );
  }
}
