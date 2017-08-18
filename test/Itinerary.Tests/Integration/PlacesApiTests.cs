using System.Collections.Generic;
using FluentAssertions;
using Itinerary.Business.Places.Dto;
using Itinerary.Business.Places.Models;
using Itinerary.Tests.Utilities;
using Xunit;

namespace Itinerary.Tests.Integration
{
  public class PlacesApiTests : IntegrationTestBase
  {
    [Fact]
    public async void It_should_return_expected_autocomplete_result()
    {
      List<PlaceLocation> placeLocations =
        await GetAsync<List<PlaceLocation>>( "/api/v1/places/autocomplete?keyword=portage" );

      placeLocations.Should().NotBeEmpty();
      placeLocations.Should().OnlyContain( x => x.Name.Contains( "Portage" ));
    }

    [Fact]
    public async void It_should_return_expected_places_result()
    {
      List<PlaceDto> places =
        await GetAsync<List<PlaceDto>>(
          "/api/v1/places/search?lat=42.2290029&lng=-85.58352060000001&distance=50&rating=4" );

      places.Should().NotBeEmpty();
      places.Should().OnlyContain( x => x.Rating >= 4 );
    }
  }
}
