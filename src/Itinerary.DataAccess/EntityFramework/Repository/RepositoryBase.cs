using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Itinerary.DataAccess.Abstract.Repository;
using Itinerary.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess.EntityFramework.Repository
{
  public abstract class RepositoryBase<TEntity> : IRepository<TEntity>
    where TEntity : EntityBase, new()
  {
    protected readonly ItineraryDbContext DbContext;

    protected RepositoryBase( ItineraryDbContext dbContext )
    {
      DbContext = dbContext;
    }

    public IEnumerable<TEntity> Get(
      Expression<Func<TEntity, bool>> filter,
      Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy,
      Func<IQueryable<TEntity>, IQueryable<TEntity>> includes )

    {
      IQueryable<TEntity> result = QueryDb(filter, orderBy, includes);
      return result.ToList();
    }

    public TEntity Get( long id )
    {
      IQueryable<TEntity> query = DbContext.Set<TEntity>();
      return query.SingleOrDefault( x => x.Id == id );
    }

    public TEntity Insert( TEntity entity )
    {
      if ( entity == null ) throw new InvalidOperationException( "Unable to add a null entity to the repository." );
      return DbContext.Set<TEntity>().Add( entity ).Entity;
    }

    public TEntity Update( TEntity entity )
    {
      return DbContext.Set<TEntity>().Update( entity ).Entity;
    }

    public void Delete( long id )
    {
      var entity = new TEntity { Id = id };
      Delete( entity );
    }

    public void Delete( TEntity entity )
    {
      DbContext.Set<TEntity>().Attach( entity );
      DbContext.Entry( entity ).State = EntityState.Deleted;
      DbContext.Set<TEntity>().Remove( entity );
    }

    public long Count( Expression<Func<TEntity, bool>> filter )
    {
      IQueryable<TEntity> query = DbContext.Set<TEntity>();

      if ( filter != null )
        query = query.Where( filter );

      return query.Count();
    }

    protected IQueryable<TEntity> QueryDb(
      Expression<Func<TEntity, bool>> filter,
      Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy,
      Func<IQueryable<TEntity>, IQueryable<TEntity>> includes )
    {
      IQueryable<TEntity> query = DbContext.Set<TEntity>();

      if ( filter != null )
        query = query.Where( filter );

      if ( includes != null )
        query = includes( query );

      if ( orderBy != null )
        query = orderBy( query );

      return query;
    }
  }
}
