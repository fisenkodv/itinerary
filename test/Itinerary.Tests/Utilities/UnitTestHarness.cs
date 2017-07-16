using Itinerary.Business;
using Itinerary.Tests.Unit.DataAccess.Fakes;

namespace Itinerary.Tests.Utilities
{
  internal class UnitTestHarness
  {
    public FakePlacesRepository PlacesRepository { get; private set; }

    public UnitTestHarness()
    {
      PlacesRepository = new FakePlacesRepository();
    }

    public IUnitOfWork CreateUnitOfWork()
    {
      return new FakeUnitOfWork( PlacesRepository );
    }
  }
}
