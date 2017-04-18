using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Itinerary.DataAccess.Repository.Interfaces
{
  public interface IRepository<TEntity>
  {
    IEnumerable<TEntity> Get( Expression<Func<TEntity, bool>> predicate );

    TEntity Get( long id );

    TEntity Insert( TEntity entity );

    TEntity Update( TEntity entity );

    void Delete( long id );

    void Delete( TEntity entity );

    long Count( Expression<Func<TEntity, bool>> predicate );
  }
}
