using System;
using Itinerary.Common;

namespace Itinerary.DataAccess.Interfaces
{
  public interface IUnitOfWork : IDisposable
  {
    IGenericRepository<Place, string> PlacesRepository { get; }

    void Save();
  }
}