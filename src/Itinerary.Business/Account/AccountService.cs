using System.Threading.Tasks;

namespace Itinerary.Business.Account
{
  //FIXME:
  public class AccountService : IAccountService
  {
    //private readonly UserManager<User> _userManager;

    public async Task<ApiCallStatus> Register( string email, string password )
    {
      //var user = new User { UserName = email, Email = email };
      //IdentityResult result = await _userManager.CreateAsync( user, password );
      //return new ApiCallStatus( result.Succeeded, result.Errors.Select( x => x.Description ) );
      return null;
    }
  }
}
