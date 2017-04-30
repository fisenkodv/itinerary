using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Itinerary.DataAccess.EntityFramework.Migrations
{
  /// <summary>
  /// This class is needed to allow Add-Migrations command to be run. 
  /// It is not a good implmentation as it has to have a constant connection sting in it
  /// but it is Ok on a local machine, which is where you want to run the command
  /// see https://docs.microsoft.com/en-us/ef/core/miscellaneous/configuring-dbcontext#using-idbcontextfactorytcontext
  /// </summary>
  public class ItineraryDbContextFactoryNeededForMigrations : IDbContextFactory<ItineraryDbContext>
  {
    private const string ConnectionString = "Data Source=itinerary.db";
    //private const string ConnectionString = "Data Source=localhost;Initial Catalog=TestDB;Integrated Security=True";

    public ItineraryDbContext Create( DbContextFactoryOptions options )
    {
      var optionsBuilder = new DbContextOptionsBuilder<ItineraryDbContext>();
      optionsBuilder.UseSqlite( ConnectionString, b => b.MigrationsAssembly( "Itinerary.DataAccess" ) );
      //optionsBuilder.UseSqlServer( ConnectionString, b => b.MigrationsAssembly( "Itinerary.DataAccess" ) );

      return new ItineraryDbContext( optionsBuilder.Options );
    }
  }

  /// <summary>
  /// This class is needed to allow Add-Migrations command to be run. 
  /// It is not a good implmentation as it has to have a constant connection sting in it
  /// but it is Ok on a local machine, which is where you want to run the command
  /// see https://docs.microsoft.com/en-us/ef/core/miscellaneous/configuring-dbcontext#using-idbcontextfactorytcontext
  /// </summary>
  public class PersistedGrantDbContextFactoryNeededForMigrations : IDbContextFactory<PersistedGrantDbContext>
  {
    private const string ConnectionString = "Data Source=itinerary.db";
    //private const string ConnectionString = "Data Source=localhost;Initial Catalog=TestDB;Integrated Security=True";

    public PersistedGrantDbContext Create( DbContextFactoryOptions options )
    {
      var optionsBuilder = new DbContextOptionsBuilder<PersistedGrantDbContext>();
      optionsBuilder.UseSqlite( ConnectionString, b => b.MigrationsAssembly( "Itinerary.DataAccess" ) );
      //optionsBuilder.UseSqlServer( ConnectionString, b => b.MigrationsAssembly( "Itinerary.DataAccess" ) );

      return new PersistedGrantDbContext( optionsBuilder.Options, new OperationalStoreOptions() );
    }
  }

  /// <summary>
  /// This class is needed to allow Add-Migrations command to be run. 
  /// It is not a good implmentation as it has to have a constant connection sting in it
  /// but it is Ok on a local machine, which is where you want to run the command
  /// see https://docs.microsoft.com/en-us/ef/core/miscellaneous/configuring-dbcontext#using-idbcontextfactorytcontext
  /// </summary>
  public class ConfigurationDbContextFactoryNeededForMigrations : IDbContextFactory<ConfigurationDbContext>
  {
    private const string ConnectionString = "Data Source=itinerary.db";
    //private const string ConnectionString = "Data Source=localhost;Initial Catalog=TestDB;Integrated Security=True";

    public ConfigurationDbContext Create( DbContextFactoryOptions options )
    {
      var optionsBuilder = new DbContextOptionsBuilder<ConfigurationDbContext>();
      optionsBuilder.UseSqlite( ConnectionString, b => b.MigrationsAssembly( "Itinerary.DataAccess" ) );
      //optionsBuilder.UseSqlServer( ConnectionString, b => b.MigrationsAssembly( "Itinerary.DataAccess" ) );

      return new ConfigurationDbContext( optionsBuilder.Options, new ConfigurationStoreOptions() );
    }
  }
}
