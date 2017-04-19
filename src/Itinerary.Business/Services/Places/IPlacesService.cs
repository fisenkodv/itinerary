using System.Collections.Generic;
using Itinerary.Common.Models;

namespace Itinerary.Business.Services.Places
{
  public interface IPlacesService
  {
    IEnumerable<PlaceDetails> Search( double lat, double lng, double distance, double rating, int reviews );
  }
}
