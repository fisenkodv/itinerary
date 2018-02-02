using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Business.Places.Models;

namespace Itinerary.Tests.Utilities.Fakes
{
  public class FakeGooglePlacesClient : IGooglePlacesClient
  {
    private readonly Dictionary<string, PlaceLocation> _placeLocations =
      new Dictionary<string, PlaceLocation>
      {
        ["kalamazoo"] = new PlaceLocation("Kalamazoo", new Location(42.201154, -85.580002))
      };

    public IEnumerable<PlaceLocation> GetPlaces(string keyword)
    {
      return _placeLocations.Keys.Where(x => x.Contains(keyword))
                            .Select(x => _placeLocations[x]);
    }
  }
}
