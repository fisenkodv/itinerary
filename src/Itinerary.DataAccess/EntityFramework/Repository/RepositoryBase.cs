using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Itinerary.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess.EntityFramework.Repository
{
  public abstract class RepositoryBase<TEntity> : IRepository<TEntity>
    where TEntity : EntityBase
  {
    protected readonly DbContext DbContext;

    protected RepositoryBase( DbContext dbContext )
    {
      DbContext = dbContext;
    }

    public IEnumerable<TEntity> Get( Expression<Func<TEntity, bool>> predicate )
    {
      throw new NotImplementedException();
    }

    public TEntity Get( long id )
    {
      throw new NotImplementedException();
    }

    public TEntity Insert( TEntity entity )
    {
      throw new NotImplementedException();
    }

    public TEntity Update( TEntity entity )
    {
      throw new NotImplementedException();
    }

    public void Delete( long id )
    {
      throw new NotImplementedException();
    }

    public void Delete( TEntity entity )
    {
      throw new NotImplementedException();
    }

    public long Count( Expression<Func<TEntity, bool>> predicate )
    {
      throw new NotImplementedException();
    }
  }
}
