using System.Threading.Tasks;
using Itinerary.Business.Identity.Abstractions;
using Itinerary.Business.Identity.Models;

namespace Itinerary.Business.Identity
{
  //FIXME:
  public class AccountService : IAccountService
  {
    //private readonly UserManager<User> _userManager;

    public async Task<ApiCallStatus> Register( User user )
    {
      //var user = new User { Username = email, Email = email };
      //IdentityResult result = await _userManager.CreateAsync( user, password );
      //return new ApiCallStatus( result.Succeeded, result.Errors.Select( x => x.Description ) );
      return null;
    }
  }
}
