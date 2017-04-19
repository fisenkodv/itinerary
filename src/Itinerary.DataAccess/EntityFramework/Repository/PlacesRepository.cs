using Itinerary.DataAccess.Abstract.Repository;
using Itinerary.DataAccess.Entities;

namespace Itinerary.DataAccess.EntityFramework.Repository
{
  public class PlacesRepository : RepositoryBase<Place>, IPlacesRepository
  {
    public PlacesRepository( ItineraryDbContext dbContext ) : base( dbContext )
    {
    }
  }
}