using Microsoft.EntityFrameworkCore;

namespace Itinerary.DataAccess.Repository.Interfaces
{
  public interface IRepositoryInjection
  {
    IRepositoryInjection SetContext(DbContext context);
  }
}
