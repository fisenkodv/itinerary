using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Itinerary.Business;
using Itinerary.Business.Models.Common;
using Itinerary.Business.Models.Places;
using Itinerary.Business.Places.Dto;
using Xunit;

namespace Itinerary.Tests.Unit
{
  public class MappingTests
  {
    [Fact]
    public void It_should_return_expected_place_dto()
    {
      var model = new Place
                  {
                    Location = new Location(
                      latitude: 42.2290029,
                      longitude: -85.58352060000001 ),
                    Name = "Test Name",
                    Categories = new[] { "a", "b", "c" }.Select( x => new Category( x ) ).ToList(),
                    ImageUrl = "http://server.com/image.png",
                    Rating = 4.5,
                    Reviews = 10
                  };

      PlaceDto dto = Mapper.Instance.Map<Place, PlaceDto>( model );

      Assert.NotNull( dto );
      Assert.Equal( dto.Location.Longitude, model.Location.Longitude );
      Assert.Contains(
        dto.Categories, dtoCategory => model.Categories.Exists( category => category.Name == dtoCategory ) );
    }
  }
}
