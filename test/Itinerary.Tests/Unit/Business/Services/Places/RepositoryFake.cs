using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Itinerary.DataAccess.Abstract.Repository;
using Itinerary.DataAccess.Entities;

namespace Itinerary.Tests.Unit.Business.Services.Places
{
  internal class RepositoryFake<TEntity> : IRepository<TEntity>
    where TEntity : EntityBase
  {
    private readonly Dictionary<long, TEntity> _entities;

    public RepositoryFake()
    {
      _entities = new Dictionary<long, TEntity>();
    }

    public IEnumerable<TEntity> Get( Expression<Func<TEntity, bool>> predicate )
    {
      Func<TEntity, bool> func = predicate.Compile();
      return _entities.Values.Where( func );
    }

    public TEntity Get( long id )
    {
      return _entities[ id ];
    }

    public TEntity Insert( TEntity entity )
    {
      long id = GetNextId();
      entity.Id = id;
      _entities[ id ] = entity;
      return entity;
    }

    public TEntity Update( TEntity entity )
    {
      _entities[ entity.Id ] = entity;
      return entity;
    }

    public void Delete( long id )
    {
      _entities.Remove( id );
    }

    public void Delete( TEntity entity )
    {
      _entities.Remove( entity.Id );
    }

    public long Count( Expression<Func<TEntity, bool>> predicate )
    {
      Func<TEntity, bool> func = predicate.Compile();
      return _entities.Values.Count( func );
    }

    private long GetNextId()
    {
      long id = 1;
      if ( _entities.Any() )
        id = _entities.Keys.Max() + 1;

      return id;
    }
  }
}
