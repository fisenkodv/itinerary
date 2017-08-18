using System.Linq;
using System.Threading.Tasks;
using Itinerary.Api.ViewModels;
using Itinerary.Business.Identity;
using Itinerary.Business.Identity.Dto;
using Itinerary.Business.Identity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Api.Controllers
{
  [Authorize]
  //[ApiVersion( "1.0" )]
  //[Route( "api/v{version:apiVersion}/[controller]" )]
  [Route( "api/v1/[controller]" )]
  public class AccountController : Controller
  {
    private readonly IAccountService _accountService;
    private readonly UserManager<DataAccess.Entities.User> _userManager;

    public AccountController(
      IAccountService accountService,
      UserManager<DataAccess.Entities.User> userManager )
    {
      _accountService = accountService;
      _userManager = userManager;
    }

    [AllowAnonymous]
    [HttpPost( "[action]" )]
    public async Task<IActionResult> Register( [FromBody] RegisterViewModel model )
    {
      RegisterResult result;
      if ( ModelState.IsValid )
        result = await _accountService.Register( new User { Email = model.Email, Password = model.Password } );
      else
        result = new RegisterResult(
          false, ModelState.Values.SelectMany( x => x.Errors ).Select( x => x.ErrorMessage ) );

      return result.Succeeded
               ? ( IActionResult ) Ok( result )
               : BadRequest( result );
    }

    [AllowAnonymous]
    [HttpPost( "token" )]
    public async Task<IActionResult> Token( [FromBody] TokenViewModel model )
    {
      if ( !ModelState.IsValid )
        return BadRequest();

      JwtToken token =
        await _accountService.Token( new User { Username = model.Username, Password = model.Password } );

      return token == null
               ? ( IActionResult ) BadRequest()
               : Ok( token );
    }
  }
}
