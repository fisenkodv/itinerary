using System;
using Itinerary.Common.Entities;

namespace Itinerary.DataAccess.Interfaces
{
  public interface IRepository<TEntity> : IGenericRepository<TEntity, Guid>
    where TEntity : EntityBase
  {
  }
}