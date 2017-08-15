using System.Linq;
using System.Threading.Tasks;
using Itinerary.Business;
using Itinerary.Business.Identity.Abstractions;
using Itinerary.Business.Identity.Models;
using Itinerary.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
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

    public AccountController( IAccountService accountService )
    {
      _accountService = accountService;
    }

    [AllowAnonymous]
    [HttpPost( "[action]" )]
    public async Task<IActionResult> Register( [FromBody] RegisterViewModel model )
    {
      ApiCallStatus result;
      if ( ModelState.IsValid )
        result = await _accountService.Register( new User { Email = model.Email, Password = model.Password } );
      else
        result = new ApiCallStatus(
          false, ModelState.Values.SelectMany( x => x.Errors ).Select( x => x.ErrorMessage ) );

      return result.Succeeded
               ? ( IActionResult ) Ok( result )
               : BadRequest( result );
    }
  }
}
