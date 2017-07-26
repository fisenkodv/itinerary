using System.Collections.Generic;
using Itinerary.Business.Models.Places;

namespace Itinerary.Business.Places.Interfaces
{
  public interface IGooglePlacesClient
  {
    IEnumerable<PlaceLocation> GetPlaces( string keyword );
  }
}
