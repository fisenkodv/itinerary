using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Itinerary.Places;
using Itinerary.Business.Itinerary.Places.Dto;
using Itinerary.Business.Itinerary.Places.Model;

namespace Itinerary.Tests.Unit.DataAccess.Fakes
{
  internal class FakePlacesRepository : IPlacesRepository
  {
    private readonly List<Place> _places;

    public FakePlacesRepository()
    {
      _places=new List<Place>();
    }


    public IEnumerable<Place> GetPlaces(
      Location northWestLocation,
      Location southEastLocation,
      double rating,
      int reviewsCount )
    {
      return _places.Where(
        place => place.Rating >= rating &&
                 place.Reviews.Count >= reviewsCount &&
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
