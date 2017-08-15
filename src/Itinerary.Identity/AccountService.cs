using System.Linq;
using System.Threading.Tasks;
using Itinerary.Business;
using Itinerary.Business.Identity;
using Itinerary.Business.Identity.Models;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Identity;

namespace Itinerary.Identity
{
  [UsedImplicitly]
  public class AccountService : IAccountService
  {
    private readonly UserManager<DataAccess.Entities.User> _userManager;

    public AccountService( UserManager<DataAccess.Entities.User> userManager )
    {
      _userManager = userManager;
    }

    public async Task<ApiCallStatus> Register( User user )
    {
      var userEntity = new DataAccess.Entities.User { UserName = user.Username ?? user.Email, Email = user.Email };
      IdentityResult result = await _userManager.CreateAsync( userEntity, user.Password );
      return new ApiCallStatus( result.Succeeded, result.Errors.Select( x => x.Description ) );
    }
  }
}
