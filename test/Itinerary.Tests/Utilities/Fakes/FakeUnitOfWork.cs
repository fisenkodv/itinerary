using Itinerary.Business;
using Itinerary.Business.Places.Abstractions;

namespace Itinerary.Tests.Utilities.Fakes
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
