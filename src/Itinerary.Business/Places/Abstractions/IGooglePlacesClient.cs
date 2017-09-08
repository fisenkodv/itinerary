using System.Collections.Generic;
using Itinerary.Business.Places.Models;

namespace Itinerary.Business.Places.Abstractions
{
  public interface IGooglePlacesClient
  {
    IEnumerable<PlaceLocation> GetPlaces( string keyword );
  }
}
