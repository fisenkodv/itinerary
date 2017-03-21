using System;
using Itinerary.DataAccess.Domain;

namespace Itinerary.DataAccess.Repository.Interfaces.Generic
{
  public interface IGuidKeyRepository<TEntity> : IGenericRepository<TEntity, Guid>
    where TEntity : EntityBase
  {
  }
}