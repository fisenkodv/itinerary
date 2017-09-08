using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Business.Places.Models;
using Itinerary.Tests.Utilities;
using Xunit;

namespace Itinerary.Tests.Unit
{
  public class PlacesServiceTests
  {
    private readonly IPlacesService _placesService;

    public PlacesServiceTests()
    {
      var harness = new UnitTestHarness();
      harness.PlacesRepository.AddPlaces(
        new[]
        {
          new Place { Rating = 1, Reviews = 10, Location = new Location( 42.29722, -85.07451 ) },
          new Place { Rating = 2, Reviews = 20, Location = new Location( 42.81097, -86.08699 ) },
          new Place { Rating = 3, Reviews = 30, Location = new Location( 42.79807, -86.09348 ) },
          new Place { Rating = 4, Reviews = 40, Location = new Location( 42.77731, -86.20029 ) },
          new Place { Rating = 5, Reviews = 50, Location = new Location( 42.66265, -86.21619 ) },
          new Place { Rating = 5, Reviews = 50, Location = new Location( -42.66265, 86.21619 ) }
        } );

      _placesService = harness.CreatePlacesService();
    }

    [Fact]
    public void It_should_return_results_in_area()
    {
      IEnumerable<Place> places =
        _placesService.Search(
                        location: new Location(
                          latitude: 42.2290029,
                          longitude: -85.58352060000001 ),
                        distance: 50,
                        rating: 0 )
                      .ToList();

      Assert.NotEmpty( places );
      Assert.Equal( 5, places.Count() );
    }

    [Fact]
    public void It_should_return_results_with_appropriate_rating()
    {
      IEnumerable<Place> places =
        _placesService.Search(
                        location: new Location(
                          latitude: 42.2290029,
                          longitude: -85.58352060000001 ),
                        distance: 50,
                        rating: 3 )
                      .ToList();

      Assert.NotEmpty( places );
      Assert.Equal( 3, places.Count() );
    }

    [Fact]
    public void It_should_return_results_for_keyword()
    {
      IEnumerable<PlaceLocation> places = _placesService.Search( "kalam" ).ToList();

      Assert.NotEmpty( places );
      Assert.Equal( 1, places.Count() );
    }
  }
}
