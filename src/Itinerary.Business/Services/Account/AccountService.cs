using System.Linq;
using System.Threading.Tasks;
using Itinerary.Common.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Itinerary.Business.Services.Account
{
  public class AccountService : IAccountService
  {
    private readonly UserManager<IdentityUser> _userManager;

    public AccountService( UserManager<IdentityUser> userManager )
    {
      _userManager = userManager;
    }

    public async Task<ApiCallStatus> Register( string email, string password )
    {
      var user = new IdentityUser { UserName = email, Email = email };
      IdentityResult result = await _userManager.CreateAsync( user, password );
      return new ApiCallStatus( result.Succeeded, result.Errors.Select( x => x.Description ) );
    }
  }
}
