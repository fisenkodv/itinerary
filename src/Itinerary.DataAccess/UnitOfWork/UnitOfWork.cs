using System;
using Itinerary.DataAccess.Exceptions;
using Itinerary.DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess.UnitOfWork
{
  public class UnitOfWork<TContext> : IUnitOfWork
    where TContext : DbContext
  {
    private TContext _context;
    private readonly IServiceProvider _serviceProvider;
    protected bool _isDisposed;

    public UnitOfWork( TContext context, IServiceProvider serviceProvider )
    {
      _context = context;
      _serviceProvider = serviceProvider;
    }

    public IPlacesRepository PlacesRepository => GetRepository<IPlacesRepository>();

    public int SaveChanges()
    {
      CheckDisposed();
      return _context.SaveChanges();
    }

    public void Dispose()
    {
      Dispose( true );
      GC.SuppressFinalize( this );
    }

    private void CheckDisposed()
    {
      if ( _isDisposed )
        throw new ObjectDisposedException( "The UnitOfWork is already disposed and cannot be used anymore." );
    }

    private TRepository GetRepository<TRepository>()
    {
      CheckDisposed();
      Type repositoryType = typeof( TRepository );
      var repository = ( TRepository ) _serviceProvider.GetService( repositoryType );
      if ( repository == null )
      {
        throw new RepositoryNotFoundException(
          repositoryType.Name,
          $"Repository {repositoryType.Name} not found in the IOC container. Check if it is registered during startup." );
      }

      //((IRepositoryInjection)repository).SetContext(_context);
      return repository;
    }

    private void Dispose( bool disposing )
    {
      if ( !_isDisposed )
      {
        if ( disposing )
        {
          if ( _context != null )
          {
            _context.Dispose();
            _context = null;
          }
        }
      }
      _isDisposed = true;
    }

    ~UnitOfWork()
    {
      Dispose( false );
    }
  }
}
