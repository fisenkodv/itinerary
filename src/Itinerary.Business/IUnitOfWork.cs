using System;
using Itinerary.Business.Places;
using Itinerary.Business.Places.Abstractions;

namespace Itinerary.Business
{
  public interface IUnitOfWork : IDisposable
  {
    IPlacesRepository PlacesRepository { get; }

    int SaveChanges();
  }
}
