using AspNet.Security.OpenIdConnect.Primitives;
using Itinerary.Business.Api.Google;
using Itinerary.Business.Services.Places;
using Itinerary.DataAccess.Abstract.UnitOfWork;
using Itinerary.DataAccess.EntityFramework;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Itinerary.Web
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddDatabaseServices(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddEntityFramework();
      services.AddDbContext<ItineraryDbContext>(
        options =>
        {
          options.UseSqlite( configuration.GetConnectionString( "SqliteConnection" ) );
          // Register the entity sets needed by OpenIddict.
          // Note: use the generic overload if you need
          // to replace the default OpenIddict entities.
          options.UseOpenIddict();
        } );

      return services;
    }

    public static IServiceCollection AddIdentityService( this IServiceCollection services )
    {
      services.AddIdentity<IdentityUser, IdentityRole>()
              .AddEntityFrameworkStores<ItineraryDbContext>()
              .AddDefaultTokenProviders();

      // Configure Identity to use the same JWT claims as OpenIddict instead
      // of the legacy WS-Federation claims it uses by default (ClaimTypes),
      // which saves you from doing the mapping in your authorization controller.
      services.Configure<IdentityOptions>(
        options =>
        {
          options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
          options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
          //options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
        } );

      return services;
    }

    public static IServiceCollection AddOpenIddictService( this IServiceCollection services )
    {
      // Register the OpenIddict services.
      services.AddOpenIddict()
              // Register the Entity Framework stores.
              .AddEntityFrameworkCoreStores<ItineraryDbContext>()
              // Register the ASP.NET Core MVC binder used by OpenIddict.
              // Note: if you don't call this method, you won't be able to
              // bind OpenIdConnectRequest or OpenIdConnectResponse parameters.
              .AddMvcBinders()
              // Enable the token endpoint.
              .EnableTokenEndpoint( "/connect/token" )
              // Enable the password flow.
              .AllowPasswordFlow()
              // During development, you can disable the HTTPS requirement.
              .DisableHttpsRequirement();

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
