using System;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Itinerary.DataAccess.Extensions;
using Microsoft.Extensions.Configuration;

namespace Itinerary.DataAccess.EntityFramework.Migrations
{
  /// <summary>
  /// This class is needed to allow Add-Migrations command to be run.
  /// It is not a good implmentation as it has to have a constant connection sting in it
  /// but it is Ok on a local machine, which is where you want to run the command
  /// see https://docs.microsoft.com/en-us/ef/core/miscellaneous/configuring-dbcontext#using-idbcontextfactorytcontext
  /// </summary>
  public class DbContextFactoryNeededForMigrationsBase
  {
    protected T Create<T>( DbContextFactoryOptions options, Func<DbContextOptionsBuilder<T>, T> dbContextFactory )
      where T : DbContext
    {
      string connectionString = GetConnectionString( options );
      if ( string.IsNullOrEmpty( connectionString ) )
        throw new ArgumentException( $"{nameof(connectionString)} is null or empty.", nameof(connectionString) );

      var optionsBuilder = new DbContextOptionsBuilder<T>();
      optionsBuilder.InitDbContext( connectionString );

      return dbContextFactory( optionsBuilder );
    }

    private static string GetConnectionString( DbContextFactoryOptions options )
    {
      IConfigurationBuilder builder = new ConfigurationBuilder()
        .SetBasePath( options.ContentRootPath )
        .AddJsonFile( "appsettings.json" )
        .AddJsonFile( $"appsettings.{options.EnvironmentName}.json", true )
        .AddEnvironmentVariables();

      IConfigurationRoot config = builder.Build();

      string connectionString = config.GetConnectionString( Constants.DefaultConnectinStringName );

      if ( string.IsNullOrWhiteSpace( connectionString ) )
        throw new InvalidOperationException(
          $"Could not find a connection string named '{Constants.DefaultConnectinStringName}'." );

      return connectionString;
    }
  }

  public class ItineraryDbContextFactoryNeededForMigrations
    : DbContextFactoryNeededForMigrationsBase, IDbContextFactory<ItineraryDbContext>
  {
    public ItineraryDbContext Create( DbContextFactoryOptions options )
    {
      return Create<ItineraryDbContext>( options, optionsBuilder => new ItineraryDbContext( optionsBuilder.Options ) );
    }
  }

  public class PersistedGrantDbContextFactoryNeededForMigrations
    : DbContextFactoryNeededForMigrationsBase, IDbContextFactory<PersistedGrantDbContext>
  {
    public PersistedGrantDbContext Create( DbContextFactoryOptions options )
    {
      return Create<PersistedGrantDbContext>(
        options,
        optionsBuilder => new PersistedGrantDbContext( optionsBuilder.Options, new OperationalStoreOptions() ) );
    }
  }

  public class ConfigurationDbContextFactoryNeededForMigrations
    : DbContextFactoryNeededForMigrationsBase, IDbContextFactory<ConfigurationDbContext>
  {
    public ConfigurationDbContext Create( DbContextFactoryOptions options )
    {
      return Create<ConfigurationDbContext>(
        options,
        optionsBuilder => new ConfigurationDbContext( optionsBuilder.Options, new ConfigurationStoreOptions() ) );
    }
  }
}
