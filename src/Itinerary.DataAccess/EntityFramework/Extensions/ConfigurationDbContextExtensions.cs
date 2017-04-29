using System.Collections.Generic;
using System.Linq;
using IdentityModel;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Models;
using ApiResource = IdentityServer4.Models.ApiResource;
using Client = IdentityServer4.Models.Client;

namespace Itinerary.DataAccess.EntityFramework.Extensions
{
  public static class ConfigurationDbContextExtensions
  {
    public static void EnsureSeedData( this ConfigurationDbContext context )
    {
      if ( context.AllMigrationsApplied() )
      {
        if ( !context.Clients.Any() )
        {
          context.Clients.AddRange(
            new Client
            {
              ClientId = "itineraryWebClient",
              ClientName = "Itinerary Web Application",
              AccessTokenLifetime = 60 * 60 * 24,
              AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
              RequireClientSecret = false,
              AllowedScopes =
              {
                "openid"
              }
            }.ToEntity()
          );

          context.SaveChanges();
        }

        if ( !context.IdentityResources.Any() )
        {
          context.IdentityResources.AddRange(
            new IdentityResources.OpenId().ToEntity(),
            new IdentityResources.Profile().ToEntity(),
            new IdentityResources.Email().ToEntity(),
            new IdentityResource
            {
              Name = "role",
              UserClaims = new List<string> { "role" }
            }.ToEntity()
          );

          context.SaveChanges();
        }

        if ( !context.ApiResources.Any() )
        {
          context.ApiResources.AddRange(
            new ApiResource
            {
              Name = "itineraryApi",
              DisplayName = "Itinerary Public API",
              Description = "Itinerary Public API Access",
              UserClaims = new[] { JwtClaimTypes.Name, JwtClaimTypes.Role },
            }.ToEntity()
          );

          context.SaveChanges();
        }
      }
    }
  }
}
