using Itinerary.DataAccess.Abstract.Repository;
using Itinerary.DataAccess.Entities;

namespace Itinerary.DataAccess.EntityFramework.Repository
{
  public class PlaceCategoriesRepository : RepositoryBase<PlaceCategory>, IPlaceCategoriesRepository
  {
    public PlaceCategoriesRepository( ItineraryDbContext dbContext ) : base( dbContext )
    {
    }
  }
}