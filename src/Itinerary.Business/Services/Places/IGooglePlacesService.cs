using System.Collections.Generic;
using Itinerary.Common.Models;

namespace Itinerary.Business.Services.Places
{
  public interface IGooglePlacesService
  {
    IEnumerable<Autocomplete> Autocomplete( string keyword );

    Location Location( string placeId );
  }
}
