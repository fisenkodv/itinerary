using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Models.Common;
using Itinerary.Business.Models.Places;
using Itinerary.Business.Places;

namespace Itinerary.Tests.Utilities.Fakes
{
  internal class FakePlacesRepository : IPlacesRepository
  {
    private readonly Dictionary<int, Place> _places;

    public FakePlacesRepository()
    {
      _places = new Dictionary<int, Place>();
    }

    public IEnumerable<Place> GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating )
    {
      return _places.Values.Where(
        place => place.Rating >= rating &&
                 place.Location.Latitude <= northWestLocation.Latitude &&
                 place.Location.Latitude >= southEastLocation.Latitude &&
                 place.Location.Longitude <= southEastLocation.Longitude &&
                 place.Location.Longitude >= northWestLocation.Longitude );
    }

    public void AddPlaces( IEnumerable<Place> places )
    {
      foreach ( Place place in places )
      {
        AddPlace( place );
      }
    }

    private int AddPlace( Place place )
    {
      int id = GetNextId();
      _places.Add( id, place );
      return id;
    }

    private int GetNextId()
    {
      return _places.Keys.Max() + 1;
    }
  }
}
