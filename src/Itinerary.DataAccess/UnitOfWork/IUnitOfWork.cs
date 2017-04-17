using System;
using Itinerary.DataAccess.Repository.Interfaces;

namespace Itinerary.DataAccess.UnitOfWork
{
  public interface IUnitOfWork : IDisposable
  {
    IPlacesRepository PlacesRepository { get; }

    int SaveChanges();
  }
}
