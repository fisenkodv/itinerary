using Itinerary.DataAccess.Entities;
using Itinerary.DataAccess.EntityFramework.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess.EntityFramework
{
  public class ItineraryDbContext : ItineraryIdentityDbContext
  {
    private readonly DbContextOptions<ItineraryDbContext> _dbContextOptions;

    public DbSet<Place> Places { get; set; }

    public DbSet<PlaceCategory> PlaceCategories { get; set; }

    public DbSet<Entities.Itinerary> Itineraries { get; set; }

    public ItineraryDbContext( DbContextOptions<ItineraryDbContext> dbContextOptions )
      : base( dbContextOptions )
    {
      _dbContextOptions = dbContextOptions;
    }

    protected override void OnModelCreating( ModelBuilder modelBuilder )
    {
      base.OnModelCreating( modelBuilder );

      modelBuilder.Entity<PlaceCategory>().Configure();
      modelBuilder.Entity<PlacePlaceCategory>().Configure();
      modelBuilder.Entity<Entities.Itinerary>().Configure();
    }
  }
}
