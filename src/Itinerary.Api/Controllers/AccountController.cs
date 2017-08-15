using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Itinerary.Api.Extensions;
using Itinerary.Api.ViewModels;
using Itinerary.Business;
using Itinerary.Business.Identity;
using Itinerary.Business.Identity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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
      UserManager<Itinerary.DataAccess.Entities.User> userManager)
    {
      _accountService = accountService;
      _userManager = userManager;
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

    [AllowAnonymous]
    [HttpGet( "token" )]
    public async Task<IActionResult> Token( string username, string password )
    {
      if ( !ModelState.IsValid )
      {
        return BadRequest();
      }

      var user = await _userManager.FindByNameAsync( username );

      if ( user == null || _userManager.PasswordHasher.VerifyHashedPassword( user, user.PasswordHash, password ) !=
           PasswordVerificationResult.Success )
      {
        return BadRequest();
      }

      var token = await GetJwtSecurityToken( user );

      return Ok(
        new
        {
          token = new JwtSecurityTokenHandler().WriteToken( token ),
          expiration = token.ValidTo
        } );
    }

    private async Task<JwtSecurityToken> GetJwtSecurityToken( Itinerary.DataAccess.Entities.User user )
    {
      var userClaims = await _userManager.GetClaimsAsync( user );

      return new JwtSecurityToken(
        issuer: "Api", //_appConfiguration.Value.SiteUrl,
        audience: "http://localhost:5000", //_appConfiguration.Value.SiteUrl,
        claims: GetTokenClaims( user ).Union( userClaims ),
        expires: DateTime.UtcNow.AddMinutes( 10 ),
        signingCredentials: new SigningCredentials( CertificatesExtensions.SigningKey, SecurityAlgorithms.RsaSha256 )
      );
    }

    private static IEnumerable<Claim> GetTokenClaims( Itinerary.DataAccess.Entities.User user )
    {
      return new List<Claim>
             {
               new Claim( JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString() ),
               new Claim( JwtRegisteredClaimNames.Sub, user.UserName )
             };
    }
  }
}
