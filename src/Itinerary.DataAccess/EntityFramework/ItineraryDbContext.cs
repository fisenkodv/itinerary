using Itinerary.DataAccess.Entities;
using Itinerary.DataAccess.EntityFramework.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess.EntityFramework
{
  public class ItineraryDbContext : IdentityDbContext<IdentityUser>
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
      base.OnModelCreating( modelBuilder );
      modelBuilder.Entity<PlacePlaceCategory>().Configure();
    }
  }
}
