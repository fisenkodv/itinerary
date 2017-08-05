using Itinerary.Tests.Utilities;
using Xunit;

namespace Itinerary.Tests.Integration
{
  public class PlacesApiTests : IntegrationTestBase
  {
    [Fact]
    public async void It_should_return_expected_autocomplete_result()
    {
      var result = await Get( "/api/v1/places/autocomplete?keyword=kalamazoo" );
    }
  }
}
