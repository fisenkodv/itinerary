using Itinerary.DataAccess.Abstract.Repository;
using Itinerary.DataAccess.Abstract.UnitOfWork;

namespace Itinerary.Tests.Unit.DataAccess.Fakes
{
  public class FakeUnitOfWork : IUnitOfWork
  {
    public FakeUnitOfWork( IPlacesRepository placesRepository )
    {
      PlacesRepository = placesRepository;
    }

    public void Dispose()
    {
    }

    public IPlacesRepository PlacesRepository { get; }


    public int SaveChanges()
    {
      return 0;
    }
  }
}
