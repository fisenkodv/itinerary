using System;
using Itinerary.Business.Itinerary.Places;

namespace Itinerary.Business
{
  public interface IUnitOfWork : IDisposable
  {
    IPlacesRepository PlacesRepository { get; }

    int SaveChanges();
  }
}
