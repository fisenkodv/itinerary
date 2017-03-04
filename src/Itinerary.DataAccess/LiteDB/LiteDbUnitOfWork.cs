using System;
using Itinerary.Common;
using Itinerary.DataAccess.Interfaces;
using LiteDB;

namespace Itinerary.DataAccess.LiteDB
{
  public class LiteDbUnitOfWork : IUnitOfWork
  {
    private readonly LiteDatabase _database;
    private bool _disposed;

    public LiteDbUnitOfWork( string connectionString )
    {
      _database = new LiteDatabase( connectionString );
    }

    protected virtual void Dispose( bool disposing )
    {
      if ( !_disposed )
        if ( disposing )
          _database.Dispose();

      _disposed = true;
    }

    public void Dispose()
    {
      Dispose( disposing: true );
      GC.SuppressFinalize( obj: this );
    }

    public IGenericRepository<Place, string> PlacesRepository
      => new LiteDbRepository<Place>( GetCollection<Place>( "places" ) );

    public void Save()
    {
    }

    private LiteCollection<TEntity> GetCollection<TEntity>( string collectionName )
    {
      return _database.GetCollection<TEntity>( collectionName );
    }
  }
}