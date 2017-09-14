using System.Threading.Tasks;
using Itinerary.Business.Identity.Dto;
using Itinerary.Business.Identity.Models;

namespace Itinerary.Business.Identity
{
  public interface IAccountService
  {
    Task<RegisterResult> Register(User user);

    Task<JwtToken> Token(User user);
  }
}
