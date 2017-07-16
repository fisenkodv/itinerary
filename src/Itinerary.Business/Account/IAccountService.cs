using System.Threading.Tasks;
using Itinerary.Common.Models;

namespace Itinerary.Business.Services.Account
{
  public interface IAccountService
  {
    Task<ApiCallStatus> Register( string email, string password );
  }
}
