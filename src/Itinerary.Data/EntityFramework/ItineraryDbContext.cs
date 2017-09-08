using Itinerary.Data.Entity;
using Itinerary.Data.EntityFramework.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.Data.EntityFramework
{
  public class ItineraryDbContext : ItineraryIdentityDbContext
  {
    private readonly DbContextOptions<ItineraryDbContext> _dbContextOptions;

    public DbSet<Place> Places { get; set; }

    public DbSet<Review> Reviews { get; set; }

    public DbSet<PlaceCategory> PlaceCategories { get; set; }

    public DbSet<Entity.Itinerary> Itineraries { get; set; }

    public ItineraryDbContext( DbContextOptions<ItineraryDbContext> dbContextOptions )
      : base( dbContextOptions )
    {
      _dbContextOptions = dbContextOptions;
    }

    protected override void OnModelCreating( ModelBuilder modelBuilder )
    {
      base.OnModelCreating( modelBuilder );

      modelBuilder.Entity<Place>().Configure();
      modelBuilder.Entity<Review>().Configure();
      modelBuilder.Entity<PlaceCategory>().Configure();
      modelBuilder.Entity<PlacePlaceCategory>().Configure();
      modelBuilder.Entity<Entity.Itinerary>().Configure();
    }
  }
}
