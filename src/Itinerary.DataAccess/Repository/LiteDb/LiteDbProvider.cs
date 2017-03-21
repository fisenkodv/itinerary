using System.Collections.Concurrent;
using System.Threading;
using LiteDB;

namespace Itinerary.DataAccess.Repository.LiteDb
{
  internal class LiteDbProvider
  {
    private static LiteDbProvider _instance = null;
    private readonly ConcurrentDictionary<string, LiteDatabase> _dbs;

    private LiteDbProvider()
    {
      _dbs = new ConcurrentDictionary<string, LiteDatabase>();
    }

    public static LiteDbProvider Instance
    {
      get
      {
        if (_instance != null) return _instance;
        LiteDbProvider temp = new LiteDbProvider();
        Interlocked.CompareExchange(ref _instance, temp, null);
        return _instance;
      }
    }

    public LiteDatabase this[string connectionString]
    {
      get { return _dbs.GetOrAdd( connectionString, connection => new LiteDatabase( connection ) ); }
    }
  }
}