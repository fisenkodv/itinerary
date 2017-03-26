using Itinerary.DataAccess.Domain;
using Itinerary.DataAccess.Repository.Interfaces;

namespace Itinerary.DataAccess.Repository.LiteDb
{
  public class PlacesRepository : LiteDbRepository<Place>, IPlacesRepository
  {
    public PlacesRepository( IRepositoryConfiguration repositoryConfiguration )
      : base( repositoryConfiguration )
    {
    }
  }
}
