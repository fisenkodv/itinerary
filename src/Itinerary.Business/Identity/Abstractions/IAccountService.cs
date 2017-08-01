using System.Threading.Tasks;
using Itinerary.Business.Identity.Models;

namespace Itinerary.Business.Identity.Abstractions
{
  public interface IAccountService
  {
    Task<ApiCallStatus> Register( User user );
  }
}
