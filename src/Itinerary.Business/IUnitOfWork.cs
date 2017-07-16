using System;
using Itinerary.DataAccess.Abstract.Repository;

namespace Itinerary.DataAccess.Abstract.UnitOfWork
{
  public interface IUnitOfWork : IDisposable
  {
    IPlacesRepository PlacesRepository { get; }

    int SaveChanges();
  }
}
