using System.Collections.Generic;
using System.Linq;
using Itinerary.Business.Services.Places;
using Itinerary.Common.Models;
using Itinerary.DataAccess.Domain;
using Xunit;
using Location = Itinerary.DataAccess.Domain.Location;

namespace Itinerary.Tests.Unit.Business.Services.Places
{
  public class PlacesServiceTests
  {
    [Fact]
    public void It_should_return_results_in_area()
    {
      var placesRepository = new PlacesRepositoryFake();
      var placesService = new PlacesService( placesRepository );

      placesRepository.Insert( new Place { Location = new Location { Latitude = 42.29722, Longitude = -85.07451 } } );
      placesRepository.Insert( new Place { Location = new Location { Latitude = 42.81097, Longitude = -86.08699 } } );
      placesRepository.Insert( new Place { Location = new Location { Latitude = 42.79807, Longitude = -86.09348 } } );
      placesRepository.Insert( new Place { Location = new Location { Latitude = 42.77731, Longitude = -86.20029 } } );
      placesRepository.Insert( new Place { Location = new Location { Latitude = 42.66265, Longitude = -86.21619 } } );
      placesRepository.Insert( new Place { Location = new Location { Latitude = -42.66265, Longitude = 86.21619 } } );

      IEnumerable<PlaceDetails> places =
        placesService.Search(
                       lat: 42.2290029, lng: -85.58352060000001, distance: 50,
                       rating: 0, reviews: 0 )
                     .ToList();

      Assert.NotEmpty( places );
      Assert.Equal( 5, places.Count() );
    }

    [Fact]
    public void It_should_return_results_with_appropriate_rating()
    {
      var placesRepository = new PlacesRepositoryFake();
      var placesService = new PlacesService( placesRepository );

      placesRepository.Insert(
        new Place { Rating = 1, Location = new Location { Latitude = 42.29722, Longitude = -85.07451 } } );
      placesRepository.Insert(
        new Place { Rating = 2, Location = new Location { Latitude = 42.81097, Longitude = -86.08699 } } );
      placesRepository.Insert(
        new Place { Rating = 3, Location = new Location { Latitude = 42.79807, Longitude = -86.09348 } } );
      placesRepository.Insert(
        new Place { Rating = 4, Location = new Location { Latitude = 42.77731, Longitude = -86.20029 } } );
      placesRepository.Insert(
        new Place { Rating = 5, Location = new Location { Latitude = 42.66265, Longitude = -86.21619 } } );
      placesRepository.Insert(
        new Place { Rating = 5, Location = new Location { Latitude = -42.66265, Longitude = 86.21619 } } );

      IEnumerable<PlaceDetails> places =
        placesService.Search(
                       lat: 42.2290029, lng: -85.58352060000001, distance: 50,
                       rating: 3, reviews: 0 )
                     .ToList();

      Assert.NotEmpty( places );
      Assert.Equal( 3, places.Count() );
    }

    [Fact]
    public void It_should_return_results_with_appropriate_reviews()
    {
      var placesRepository = new PlacesRepositoryFake();
      var placesService = new PlacesService( placesRepository );

      placesRepository.Insert(
        new Place { Reviews = 10, Location = new Location { Latitude = 42.29722, Longitude = -85.07451 } } );
      placesRepository.Insert(
        new Place { Reviews = 20, Location = new Location { Latitude = 42.81097, Longitude = -86.08699 } } );
      placesRepository.Insert(
        new Place { Reviews = 30, Location = new Location { Latitude = 42.79807, Longitude = -86.09348 } } );
      placesRepository.Insert(
        new Place { Reviews = 40, Location = new Location { Latitude = 42.77731, Longitude = -86.20029 } } );
      placesRepository.Insert(
        new Place { Reviews = 50, Location = new Location { Latitude = 42.66265, Longitude = -86.21619 } } );
      placesRepository.Insert(
        new Place { Reviews = 50, Location = new Location { Latitude = -42.66265, Longitude = 86.21619 } } );

      IEnumerable<PlaceDetails> places =
        placesService.Search(
                       lat: 42.2290029, lng: -85.58352060000001, distance: 50,
                       rating: 0, reviews: 30 )
                     .ToList();

      Assert.NotEmpty( places );
      Assert.Equal( 3, places.Count() );
    }
  }
}
