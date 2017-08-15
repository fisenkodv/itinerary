using System.Threading.Tasks;
using Itinerary.Business.Identity.Models;

namespace Itinerary.Business.Identity
{
  public interface IAccountService
  {
    Task<ApiCallStatus> Register( User user );
  }
}
