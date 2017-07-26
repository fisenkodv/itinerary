using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Models.Common;
using Itinerary.Business.Models.Places;
using Itinerary.Business.Places;

namespace Itinerary.Tests.Utilities.Fakes
{
  internal class FakePlacesRepository : IPlacesRepository
  {
    private int _id;
    private readonly List<Place> _places;

    public FakePlacesRepository()
    {
      _places = new List<Place>();
    }

    public IEnumerable<Place> GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating )
    {
      return _places.Where(
        place => place.Rating >= rating &&
                 place.Location.Latitude <= northWestLocation.Latitude &&
                 place.Location.Latitude >= southEastLocation.Latitude &&
                 place.Location.Longitude <= southEastLocation.Longitude &&
                 place.Location.Longitude >= northWestLocation.Longitude );
    }

    public void AddPlaces( IEnumerable<Place> places )
    {
      _places.AddRange( places );
    }
  }
}
