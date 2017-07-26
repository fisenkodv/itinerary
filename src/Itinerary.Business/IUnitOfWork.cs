using System;
using Itinerary.Business.Places;

namespace Itinerary.Business
{
  public interface IUnitOfWork : IDisposable
  {
    IPlacesRepository PlacesRepository { get; }

    int SaveChanges();
  }
}
