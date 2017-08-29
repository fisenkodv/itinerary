using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Itinerary.Business.Identity;
using Itinerary.Business.Identity.Dto;
using Itinerary.Business.Identity.Models;
using Itinerary.Common.Cryptography;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Itinerary.Identity
{
  [UsedImplicitly]
  public class AccountService : IAccountService
  {
    private readonly UserManager<Data.Entities.User> _userManager;
    private readonly IConfiguration _configuration;

    public AccountService( UserManager<Data.Entities.User> userManager, IConfiguration configuration )
    {
      _userManager = userManager;
      _configuration = configuration;
    }

    public async Task<RegisterResult> Register( User user )
    {
      var userEntity = new Data.Entities.User { UserName = user.Username ?? user.Email, Email = user.Email };
      IdentityResult result = await _userManager.CreateAsync( userEntity, user.Password );
      return new RegisterResult( result.Succeeded, result.Errors.Select( x => x.Description ) );
    }

    public async Task<JwtToken> Token( User user )
    {
      Data.Entities.User existingUser = await _userManager.FindByNameAsync( user.Username );

      if ( existingUser == null ||
           _userManager.PasswordHasher.VerifyHashedPassword(
             existingUser, existingUser.PasswordHash, user.Password ) !=
           PasswordVerificationResult.Success )
        return null;

      JwtSecurityToken securityToken = await GetJwtSecurityToken( existingUser );
      return new JwtToken(
        token: new JwtSecurityTokenHandler().WriteToken( securityToken ),
        expiration: securityToken.ValidTo );
    }

    private async Task<JwtSecurityToken> GetJwtSecurityToken( Data.Entities.User user )
    {
      return new JwtSecurityToken(
        issuer: _configuration.GetValue<string>( "JWT:Issuer" ),
        audience: _configuration.GetValue<string>( "JWT:Audience" ),
        claims: await GetTokenClaims( user ),
        expires: DateTime.UtcNow.AddSeconds( _configuration.GetValue( "JWT:Lifetime", 60 * 60 * 24 ) ),
        signingCredentials: CertificateExtensions.SigningCredentials
      );
    }

    private async Task<IEnumerable<Claim>> GetTokenClaims( Data.Entities.User user )
    {
      IList<Claim> userClaims = await _userManager.GetClaimsAsync( user );

      return new List<Claim>
             {
               new Claim( JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString() ),
               new Claim( JwtRegisteredClaimNames.Sub, user.UserName )
             }.Union( userClaims );
    }
  }
}
