using System;
using System.IO;
using Itinerary.Data.EntityFramework.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Itinerary.Data.EntityFramework.Migrations
{
  /// <summary>
  /// This class is needed to allow Add-Migrations command to be run.
  /// It is not a good implmentation as it has to have a constant connection sting in it
  /// but it is Ok on a local machine, which is where you want to run the command
  /// see https://docs.microsoft.com/en-us/ef/core/miscellaneous/configuring-dbcontext#using-idbcontextfactorytcontext
  /// </summary>
  public class DbContextFactoryNeededForMigrationsBase
  {
    protected T Create<T>(Func<DbContextOptionsBuilder<T>, T> dbContextFactory)
      where T : DbContext
    {
      string connectionString = GetConnectionString();
      if (string.IsNullOrEmpty(connectionString))
        throw new ArgumentException($"{nameof(connectionString)} is null or empty.", nameof(connectionString));

      var optionsBuilder = new DbContextOptionsBuilder<T>();
      optionsBuilder.InitDbContext(connectionString);

      return dbContextFactory(optionsBuilder);
    }

    private static string GetConnectionString()
    {
      IConfigurationBuilder builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", true)
        .AddEnvironmentVariables();

      IConfigurationRoot config = builder.Build();

      string connectionString = config.GetConnectionString(Constants.DefaultConnectinStringName);

      if (string.IsNullOrWhiteSpace(connectionString))
        throw new InvalidOperationException(
          $"Could not find a connection string named '{Constants.DefaultConnectinStringName}'.");

      return connectionString;
    }
  }

  public class ItineraryDbContextFactoryNeededForMigrations
    : DbContextFactoryNeededForMigrationsBase, IDesignTimeDbContextFactory<ItineraryDbContext>
  {
    public ItineraryDbContext CreateDbContext(string[] args)
    {
      return Create<ItineraryDbContext>(optionsBuilder => new ItineraryDbContext(optionsBuilder.Options));
    }
  }
}