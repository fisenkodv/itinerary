using System.IO;
using System.Net;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Itinerary.Business.Api.Google;
using Itinerary.Business.Services.Places;
using Itinerary.DataAccess.Abstract.UnitOfWork;
using Itinerary.DataAccess.EntityFramework;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Itinerary.Web
{
  public static class ServiceCollectionExtensions
  {
    private static readonly string MigrationAssemblyName = typeof( ItineraryDbContext )
      .GetTypeInfo()
      .Assembly.GetName()
      .Name;

    public static string GetConnectionString( this IConfiguration configuration )
    {
      return configuration.GetConnectionString( "SqliteConnection" );
    }

    public static IServiceCollection AddDatabaseServices(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddEntityFramework();
      services.AddDbContext<ItineraryDbContext>(
        builder =>
        {
          builder.UseSqlite(
            configuration.GetConnectionString(),
            options => options.MigrationsAssembly( MigrationAssemblyName ) );
        } );

      return services;
    }

    public static IServiceCollection AddIdentityService( this IServiceCollection services )
    {
      services.AddIdentity<IdentityUser, IdentityRole>(
                identityOptions =>
                {
                  identityOptions.Cookies.ApplicationCookie.Events =
                    new CookieAuthenticationEvents
                    {
                      OnRedirectToLogin =
                        context =>
                        {
                          if ( context.Request.Path.StartsWithSegments( "/api" ) &&
                               context.Response.StatusCode == ( int ) HttpStatusCode.OK )
                            context.Response.StatusCode = ( int ) HttpStatusCode.Unauthorized;
                          else
                            context.Response.Redirect( context.RedirectUri );

                          return Task.CompletedTask;
                        }
                    };
                }
              )
              .AddEntityFrameworkStores<ItineraryDbContext>()
              .AddDefaultTokenProviders();

      return services;
    }

    public static IServiceCollection AddIdentityServerService(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      var certificate = new X509Certificate2( Path.Combine( "certs", "ItineraryRoot.pfx" ) );
      services.AddIdentityServer()
              .AddSigningCredential( certificate )
              //.AddTemporarySigningCredential()
              .AddAspNetIdentity<IdentityUser>()
              .AddOperationalStore(
                builder => builder.UseSqlite(
                  configuration.GetConnectionString(),
                  options => options.MigrationsAssembly( MigrationAssemblyName ) ) )
              .AddConfigurationStore(
                builder => builder.UseSqlite(
                  configuration.GetConnectionString(),
                  options => options.MigrationsAssembly( MigrationAssemblyName ) ) );

      return services;
    }

    public static IServiceCollection AddCustomServices(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddSingleton( configuration.GetGoogleClientSecrets() );

      services.AddTransient( typeof( IUnitOfWork ), typeof( UnitOfWork ) );
      services.AddTransient<IPlacesService, PlacesService>();
      services.AddTransient<IGooglePlacesService, GooglePlacesService>();

      return services;
    }
  }
}
