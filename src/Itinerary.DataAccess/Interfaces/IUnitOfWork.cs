using System;
using Itinerary.Common.Entities;

namespace Itinerary.DataAccess.Interfaces
{
  public interface IUnitOfWork : IDisposable
  {
    IRepository<Place> PlacesRepository { get; }

    void Save();
  }
}