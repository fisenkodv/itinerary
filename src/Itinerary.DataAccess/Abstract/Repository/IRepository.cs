using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Itinerary.DataAccess.Abstract.Repository
{
  public interface IRepository<TEntity>
  {
    IEnumerable<TEntity> Get(
      Expression<Func<TEntity, bool>> filter,
      Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
      Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = null );

    TEntity Get( long id );

    TEntity Insert( TEntity entity );

    TEntity Update( TEntity entity );

    void Delete( long id );

    void Delete( TEntity entity );

    long Count( Expression<Func<TEntity, bool>> predicate );
  }
}
