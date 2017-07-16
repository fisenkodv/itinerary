using System.Threading.Tasks;

namespace Itinerary.Business.Account
{
  public interface IAccountService
  {
    Task<ApiCallStatus> Register( string email, string password );
  }
}
