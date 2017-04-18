using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess
{
  public class ItineraryDbContext : DbContext
  {
    private readonly DbContextOptions<ItineraryDbContext> _dbContextOptions;

    public ItineraryDbContext( DbContextOptions<ItineraryDbContext> dbContextOptions )
      : base( dbContextOptions )
    {
      _dbContextOptions = dbContextOptions;
    }
  }
}
