using System.Collections.Generic;
using Itinerary.Common.Models;
using Itinerary.DataAccess.Domain;

namespace Itinerary.Business.Services.Places
{
  public interface IPlacesService
  {
    IEnumerable<PlaceDetails> Search( double lat, double lng, double distance, double rating, int reviews );
  }
}
