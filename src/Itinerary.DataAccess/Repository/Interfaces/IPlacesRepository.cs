using Itinerary.DataAccess.Domain;
using Itinerary.DataAccess.Entities;

namespace Itinerary.DataAccess.Repository.Interfaces
{
  public interface IPlacesRepository : IRepository<Place>
  {
  }

  public class PlacesRepository : RepositoryBase<Place>, IPlacesRepository
  {
    public PlacesRepository( ItineraryDbContext dbContext ) : base( dbContext )
    {
    }
  }
}
