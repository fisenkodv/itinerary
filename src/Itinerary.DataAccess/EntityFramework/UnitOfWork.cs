using System;
using Itinerary.DataAccess.Repository.Interfaces;

namespace Itinerary.DataAccess.UnitOfWork
{
  public class UnitOfWork : IUnitOfWork
  {
    private ItineraryDbContext _dbContext;
    protected bool _isDisposed;

    public UnitOfWork( ItineraryDbContext dbContext )
    {
      _dbContext = dbContext;
      PlacesRepository = new PlacesRepository( dbContext );
    }

    public IPlacesRepository PlacesRepository { get; }

    public int SaveChanges()
    {
      CheckDisposed();
      return _dbContext.SaveChanges();
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

    private void Dispose( bool disposing )
    {
      if ( !_isDisposed )
      {
        if ( disposing )
        {
          if ( _dbContext != null )
          {
            _dbContext.Dispose();
            _dbContext = null;
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
