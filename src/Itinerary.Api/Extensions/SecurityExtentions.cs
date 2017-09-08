using System.Net;
using System.Threading.Tasks;
using Itinerary.Common.Cryptography;
using Itinerary.Data.Entity;
using Itinerary.Data.EntityFramework;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Itinerary.Api.Extensions
{
  internal static class SecurityExtentions
  {
    public static IServiceCollection AddSecurity( this IServiceCollection services, IConfiguration configuration )
    {
      services.AddIdentity<User, Role>()
              .AddEntityFrameworkStores<ItineraryDbContext>()
              .AddDefaultTokenProviders();

      services.AddAuthentication(
                options =>
                {
                  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                  options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                } )
              .AddJwtBearer(
                options =>
                {
                  options.SaveToken = true;
                  options.TokenValidationParameters =
                    new TokenValidationParameters
                    {
                      ValidIssuer = configuration.GetValue<string>( "JWT:Issuer" ),
                      ValidAudience = configuration.GetValue<string>( "JWT:Audience" ),
                      IssuerSigningKey = CertificateExtensions.GetSigningKey( configuration.GetValue<string>( "JWT:SecretKey" ) ),
                      ValidateIssuerSigningKey = true,
                      ValidateLifetime = true
                    };
                } )
              .AddCookie(
                options =>
                {
                  options.Events =
                    new CookieAuthenticationEvents
                    {
                      OnRedirectToLogin =
                        context =>
                        {
                          if ( context.Request.Path.StartsWithSegments( "/api" ) )
                            context.Response.StatusCode = ( int ) HttpStatusCode.Unauthorized;
                          else
                            context.Response.Redirect( context.RedirectUri );

                          return Task.CompletedTask;
                        }
                    };
                } );

      return services;
    }
  }
}
