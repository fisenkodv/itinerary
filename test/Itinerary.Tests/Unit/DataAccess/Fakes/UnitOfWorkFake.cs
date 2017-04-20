using Itinerary.DataAccess.Abstract.Repository;
using Itinerary.DataAccess.Abstract.UnitOfWork;

namespace Itinerary.Tests.Unit.DataAccess.Fakes
{
  public class UnitOfWorkFake : IUnitOfWork
  {
    public UnitOfWorkFake()
    {
      PlacesRepository = new PlacesRepositoryFake();
      PlaceCategoriesRepository = new PlaceCategoriesRepositoryFake();
    }

    public void Dispose()
    {
    }

    public IPlacesRepository PlacesRepository { get; }

    public IPlaceCategoriesRepository PlaceCategoriesRepository { get; }

    public int SaveChanges()
    {
      return 0;
    }
  }
}
