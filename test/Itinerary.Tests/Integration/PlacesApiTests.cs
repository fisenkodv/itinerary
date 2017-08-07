using System;
using System.Collections.Generic;
using System.Linq;
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
      string result = await GetAsync( "/api/v1/places/autocomplete?keyword=portage" );

      List<PlaceLocation> placeLocations = FromJson<IEnumerable<PlaceLocation>>( result ).ToList();

      Assert.NotEmpty( placeLocations );
      Assert.All(
        placeLocations,
        placeLocation =>
          Assert.Contains( "portage", placeLocation.Name, StringComparison.CurrentCultureIgnoreCase ) );
    }

    [Fact]
    public async void It_should_return_expected_places_result()
    {
      string result =
        await GetAsync( "/api/v1/places/search?lat=42.2290029&lng=-85.58352060000001&distance=50&rating=4" );

      List<PlaceDto> places = FromJson<IEnumerable<PlaceDto>>( result ).ToList();

      Assert.NotEmpty( places );
      Assert.All( places, place => Assert.True( place.Rating >= 4 ) );
    }
  }
}
