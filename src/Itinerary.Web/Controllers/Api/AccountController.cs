using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Itinerary.DataAccess.EntityFramework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Itinerary.Web.Controllers.Api
{
  public class RegisterViewModel
  {
    [Required]
    [EmailAddress]
    [Display( Name = "Email" )]
    public string Email { get; set; }

    [Required]
    [StringLength( 100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6 )]
    [DataType( DataType.Password )]
    [Display( Name = "Password" )]
    public string Password { get; set; }
  }

  [Authorize]
  public class AccountController : Controller
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ItineraryDbContext _itineraryDbContext;
    private static bool _databaseChecked;

    public AccountController(
      UserManager<IdentityUser> userManager,
      ItineraryDbContext itineraryDbContext )
    {
      _userManager = userManager;
      _itineraryDbContext = itineraryDbContext;
    }

    //
    // POST: /Account/Register
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Register( [FromBody] RegisterViewModel model )
    {
      EnsureDatabaseCreated( _itineraryDbContext );
      if ( ModelState.IsValid )
      {
        var user = new IdentityUser { UserName = model.Email, Email = model.Email };
        var result = await _userManager.CreateAsync( user, model.Password );
        if ( result.Succeeded )
        {
          return Ok();
        }
        AddErrors( result );
      }

      // If we got this far, something failed.
      return BadRequest( ModelState );
    }

    #region Helpers

    // The following code creates the database and schema if they don't exist.
    // This is a temporary workaround since deploying database through EF migrations is
    // not yet supported in this release.
    // Please see this http://go.microsoft.com/fwlink/?LinkID=615859 for more information on how to do deploy the database
    // when publishing your application.
    private static void EnsureDatabaseCreated( ItineraryDbContext context )
    {
      if ( !_databaseChecked )
      {
        _databaseChecked = true;
        context.Database.EnsureCreated();
      }
    }

    private void AddErrors( IdentityResult result )
    {
      foreach ( var error in result.Errors )
      {
        ModelState.AddModelError( string.Empty, error.Description );
      }
    }

    #endregion
  }
}
