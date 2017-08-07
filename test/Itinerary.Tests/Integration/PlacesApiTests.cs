using System;
using System.Collections.Generic;
using System.Linq;
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
  }
}
