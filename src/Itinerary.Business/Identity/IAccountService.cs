using System.Threading.Tasks;
using Itinerary.Business.Models.Users;

namespace Itinerary.Business.Account
{
  public interface IAccountService
  {
    Task<ApiCallStatus> Register( User user );
  }
}
