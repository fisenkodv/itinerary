using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Itinerary.DataAccess.Domain;

namespace Itinerary.DataAccess.Repository.Interfaces.Generic
{
  public interface IGenericRepository<TEntity, in TKey>
    where TEntity : IEntityBase<TKey>
    where TKey : IEquatable<TKey>
  {
    IEnumerable<TEntity> Get( Expression<Func<TEntity, bool>> predicate );

    TEntity GetById( TKey id );

    TEntity Insert( TEntity entity );

    void InsertMany( IEnumerable<TEntity> entities );

    TEntity Update( TEntity entity );

    void UpdateMany( IEnumerable<TEntity> entities );

    void Delete( TKey id );

    void Delete( TEntity entity );

    void Delete( Expression<Func<TEntity, bool>> predicate );

    long Count();

    long Count( Expression<Func<TEntity, bool>> predicate );

    bool Exists( Expression<Func<TEntity, bool>> predicate );
  }
}