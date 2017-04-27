using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace Itinerary.Web
{
  internal class Clients
  {
    public static IEnumerable<Client> Get()
    {
      return new List<Client>
             {
               new Client
               {
                 //ClientId = "oauthClient",
                 //ClientName = "Example Client Credentials Client Application",
                 //AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                 //ClientSecrets = new List<Secret>
                 //                {
                 //                  new Secret(
                 //                    "superSecretPassword".Sha256() )
                 //                },
                 //AllowedScopes = new List<string> { "customAPI.read" }
                 ClientId = "oauthClient",
                 ClientName = "My Custom Client",
                 AccessTokenLifetime = 60 * 60 * 24,
                 AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                 RequireClientSecret = false,
                 AllowedScopes =
                 {
                   "openid"
                 }
               }
             };
    }
  }

  internal class Resources
  {
    public static IEnumerable<IdentityResource> GetIdentityResources()
    {
      return new List<IdentityResource>
             {
               new IdentityResources.OpenId(),
               new IdentityResources.Profile(),
               new IdentityResources.Email(),
               new IdentityResource
               {
                 Name = "role",
                 UserClaims = new List<string> { "role" }
               }
             };
    }

    public static IEnumerable<ApiResource> GetApiResources()
    {
      return new List<ApiResource>
             {
               new ApiResource
               {
                 Name = "customAPI",
                 DisplayName = "Custom API",
                 Description = "Custom API Access",
                 UserClaims = new[] { JwtClaimTypes.Name, JwtClaimTypes.Role },
                 //ApiSecrets =
                 //  new List<Secret> { new Secret( "scopeSecret".Sha256() ) },
                 //Scopes = new List<Scope>
                 //         {
                 //           new Scope( "customAPI.read" ),
                 //           new Scope( "customAPI.write" )
                 //         }
               }
             };
    }
  }

  internal class Users
  {
    public static List<TestUser> Get()
    {
      return new List<TestUser>
             {
               new TestUser
               {
                 SubjectId = "5BE86359-073C-434B-AD2D-A3932222DABE",
                 Username = "scott",
                 Password = "password",
                 Claims = new List<Claim>
                          {
                            new Claim(
                              JwtClaimTypes.Email,
                              "scott@scottbrady91.com" ),
                            new Claim( JwtClaimTypes.Role, "admin" )
                          }
               }
             };
    }
  }
}
