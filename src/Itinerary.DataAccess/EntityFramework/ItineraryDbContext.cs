using Itinerary.DataAccess.Entities;
using Itinerary.DataAccess.EntityFramework.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Itinerary.DataAccess.EntityFramework
{
  public class ItineraryDbContext : DbContext
  {
    private readonly DbContextOptions<ItineraryDbContext> _dbContextOptions;

    public DbSet<Place> Place { get; set; }

    public DbSet<PlaceCategory> PlaceCategory { get; set; }

    public ItineraryDbContext( DbContextOptions<ItineraryDbContext> dbContextOptions )
      : base( dbContextOptions )
    {
      _dbContextOptions = dbContextOptions;
    }

    protected override void OnModelCreating( ModelBuilder modelBuilder )
    {
      modelBuilder.Entity<PlacePlaceCategory>().Configure();
    }
  }

  /// <summary>
  /// This class is needed to allow Add-Migrations command to be run. 
  /// It is not a good implmentation as it has to have a constant connection sting in it
  /// but it is Ok on a local machine, which is where you want to run the command
  /// see https://docs.microsoft.com/en-us/ef/core/miscellaneous/configuring-dbcontext#using-idbcontextfactorytcontext
  /// </summary>
  public class ContextFactoryNeededForMigrations : IDbContextFactory<ItineraryDbContext>
  {
    private const string ConnectionString = "Data Source=itinerary.db";
    //private const string ConnectionString = "Data Source=localhost;Initial Catalog=TestDB;Integrated Security=True";

    public ItineraryDbContext Create( DbContextFactoryOptions options )
    {
      var optionsBuilder = new DbContextOptionsBuilder<ItineraryDbContext>();
      optionsBuilder.UseSqlite( ConnectionString, b => b.MigrationsAssembly( "Itinerary.DataAccess" ) );
      optionsBuilder.UseSqlServer( ConnectionString, b => b.MigrationsAssembly( "Itinerary.DataAccess" ) );

      return new ItineraryDbContext( optionsBuilder.Options );
    }
  }
}
