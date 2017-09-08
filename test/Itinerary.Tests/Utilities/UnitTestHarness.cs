using Itinerary.Business.Places;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Tests.Utilities.Fakes;

namespace Itinerary.Tests.Utilities
{
  internal class UnitTestHarness
  {
    public FakePlacesRepository PlacesRepository { get; }

    public UnitTestHarness()
    {
      PlacesRepository = new FakePlacesRepository();
    }

    public IPlacesService CreatePlacesService()
    {
      return new PlacesService( PlacesRepository, new FakeGooglePlacesClient() );
    }
  }
}
