using System;
using Itinerary.Common.Entities;
using Itinerary.DataAccess.Interfaces;
using LiteDB;

namespace Itinerary.DataAccess.LiteDB
{
  public sealed class LiteDbUnitOfWork : IUnitOfWork
  {
    private readonly LiteDatabase _database;
    private bool _disposed;

    public LiteDbUnitOfWork( string connectionString )
    {
      _database = new LiteDatabase( connectionString );
    }

    private void Dispose( bool disposing )
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

    public IRepository<Place> PlacesRepository
      => new LiteDbRepository<Place>( _database );

    public void Save()
    {
    }
  }
}