using Itinerary.Business;
using Itinerary.Business.Places;
using Itinerary.Business.Places.Interfaces;
using Itinerary.Tests.Utilities.Fakes;

namespace Itinerary.Tests.Utilities
{
  internal class UnitTestHarness
  {
    public FakePlacesRepository PlacesRepository { get; private set; }

    public UnitTestHarness()
    {
      PlacesRepository = new FakePlacesRepository();
    }

    //public IUnitOfWork CreateUnitOfWork()
    //{
    //  return new FakeUnitOfWork( PlacesRepository );
    //}

    public IPlacesService CreatePlacesService()
    {
      return new PlacesService( new FakeUnitOfWork( PlacesRepository ), new FakeGooglePlacesClient() );
    }
  }
}
