using Itinerary.Business;
using Itinerary.Business.Itinerary.Places;

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
