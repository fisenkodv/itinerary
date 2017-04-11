using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Itinerary.DataAccess.Domain;
using Itinerary.DataAccess.Repository.Interfaces.Generic;

namespace Itinerary.Tests.Unit.Business.Services.Places
{
  internal class GuidKeyRepositoryFake<TEntity> : IGuidKeyRepository<TEntity>
    where TEntity : EntityBase
  {
    private readonly Dictionary<Guid, TEntity> _entities;

    public GuidKeyRepositoryFake()
    {
      _entities = new Dictionary<Guid, TEntity>();
    }

    public long Count()
    {
      return _entities.Count;
    }

    public long Count( Expression<Func<TEntity, bool>> predicate )
    {
      Func<TEntity, bool> func = predicate.Compile();
      return _entities.Values.Count( func );
    }

    public void Delete( Guid id )
    {
      _entities.Remove( id );
    }

    public void Delete( TEntity entity )
    {
      _entities.Remove( entity.Id );
    }

    public void Delete( Expression<Func<TEntity, bool>> predicate )
    {
      Func<TEntity, bool> func = predicate.Compile();
      List<TEntity> itemsToRemove = _entities.Values.Where( func ).ToList();
      foreach ( TEntity entity in itemsToRemove )
        Delete( entity );
    }

    public bool Exists( Expression<Func<TEntity, bool>> predicate )
    {
      Func<TEntity, bool> func = predicate.Compile();
      return _entities.Values.All( func );
    }

    public IEnumerable<TEntity> Get( Expression<Func<TEntity, bool>> predicate )
    {
      Func<TEntity, bool> func = predicate.Compile();
      return _entities.Values.Where( func );
    }

    public TEntity GetById( Guid id )
    {
      return _entities[ id ];
    }

    public TEntity Insert( TEntity entity )
    {
      entity.Id = Guid.NewGuid();
      _entities[ entity.Id ] = entity;
      return entity;
    }

    public void InsertMany( IEnumerable<TEntity> entities )
    {
      foreach ( TEntity entity in entities )
      {
        Insert( entity );
      }
    }

    public TEntity Update( TEntity entity )
    {
      _entities[ entity.Id ] = entity;
      return entity;
    }

    public void UpdateMany( IEnumerable<TEntity> entities )
    {
      foreach ( TEntity entity in entities )
      {
        Update( entity );
      }
    }
  }
}
