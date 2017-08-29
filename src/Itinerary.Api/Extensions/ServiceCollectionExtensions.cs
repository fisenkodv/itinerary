using System;
using System.IO.Compression;
using System.Net;
using System.Threading.Tasks;
using Itinerary.Business;
using Itinerary.Business.Identity;
using Itinerary.Business.Places;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Common.Cryptography;
using Itinerary.Data.Entity;
using Itinerary.Data.EntityFramework;
using Itinerary.Data.EntityFramework.Extensions;
using Itinerary.Data.Repository;
using Itinerary.GoogleApiClient;
using Itinerary.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Itinerary.Api.Extensions
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddCompression(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      if ( !string.Equals(
             configuration[ "EnableCompression" ],
             bool.TrueString,
             StringComparison.CurrentCultureIgnoreCase ) ) return services;

      services.Configure<GzipCompressionProviderOptions>(
        options => options.Level = CompressionLevel.Optimal );
      services.AddResponseCompression( options => { options.Providers.Add<GzipCompressionProvider>(); } );

      return services;
    }

    public static IServiceCollection AddDatabaseServices(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddEntityFrameworkSqlite();
      services.AddDbContextPool<ItineraryDbContext>( builder => builder.InitDbContext( configuration ) );

      return services;
    }

    public static IServiceCollection AddIdentity( this IServiceCollection services, IConfiguration configuration )
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
                      IssuerSigningKey = CertificateExtensions.SigningKey,
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

    public static IServiceCollection AddCustomServices(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddSingleton( configuration.GetGoogleClientSecrets() );

      services.AddTransient<IPlacesRepository, PlacesRepository>();
      services.AddTransient<IPlacesService, PlacesService>();
      services.AddTransient<IGooglePlacesClient, GooglePlacesClient>();
      services.AddTransient<IAccountService, AccountService>();

      return services;
    }
  }
}
