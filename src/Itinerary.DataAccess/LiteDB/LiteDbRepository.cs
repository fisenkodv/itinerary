using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Itinerary.Common;
using Itinerary.DataAccess.Interfaces;
using LiteDB;

namespace Itinerary.DataAccess.LiteDB
{
  public class LiteDbRepository<TEntity> : IGenericRepository<TEntity, string>
    where TEntity : EntityBase<string>
  {
    private readonly LiteCollection<TEntity> _collection;

    public LiteDbRepository( LiteCollection<TEntity> collection )
    {
      _collection = collection;
    }

    public IEnumerable<TEntity> Get( Expression<Func<TEntity, bool>> predicate )
    {
      return _collection.Find( predicate );
    }

    public TEntity GetById( string id )
    {
      return _collection.FindOne( x => x.Id == id );
    }

    public TEntity Insert( TEntity entity )
    {
      entity.Id = _collection.Insert( entity ).AsString;
      return entity;
    }

    public void InsertMany( IEnumerable<TEntity> entities )
    {
      _collection.Insert( entities );
    }

    public TEntity Update( TEntity entity )
    {
      _collection.Update( entity );
      return entity;
    }

    public void UpdateMany( IEnumerable<TEntity> entities )
    {
      _collection.Update( entities );
    }

    public void Delete( string id )
    {
      _collection.Delete( x => x.Id == id );
    }

    public void Delete( TEntity entity )
    {
      Delete( entity.Id );
    }

    public void Delete( Expression<Func<TEntity, bool>> predicate )
    {
      _collection.Delete( predicate );
    }

    public long Count()
    {
      return _collection.Count();
    }

    public long Count( Expression<Func<TEntity, bool>> predicate )
    {
      return _collection.Count( predicate );
    }

    public bool Exists( Expression<Func<TEntity, bool>> predicate )
    {
      throw new NotImplementedException();
    }
  }
}