using System.Reflection;
using IdentityServer4.EntityFramework.DbContexts;
using Itinerary.Business.Api.Google;
using Itinerary.Business.Services.Places;
using Itinerary.DataAccess.Abstract.UnitOfWork;
using Itinerary.DataAccess.EntityFramework;
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
        options => { options.UseSqlite( configuration.GetConnectionString( "SqliteConnection" ) ); } );

      //services.AddDbContext<PersistedGrantDbContext>(
      //  options => { options.UseSqlite(configuration.GetConnectionString("SqliteConnection")); });

      //services.AddDbContext<ConfigurationDbContext>(
      //  options => { options.UseSqlite(configuration.GetConnectionString("SqliteConnection")); });

      return services;
    }

    public static IServiceCollection AddIdentityService( this IServiceCollection services )
    {
      services.AddIdentity<IdentityUser, IdentityRole>()
              .AddEntityFrameworkStores<ItineraryDbContext>()
              .AddDefaultTokenProviders();

      return services;
    }

    public static IServiceCollection AddIdentityServerService(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      //var cert = new X509Certificate2(Path.Combine(_environment.ContentRootPath, "damienbodserver.pfx"), "");

      //services.AddIdentityServer()
      //        //.AddSigningCredential(cert)
      //        .AddTemporarySigningCredential()
      //        .AddInMemoryIdentityResources(Resources.GetIdentityResources())
      //        .AddInMemoryApiResources(Resources.GetApiResources())
      //        .AddInMemoryClients(Clients.Get())
      //        .AddTestUsers(Users.Get());

      var migrationsAssembly = typeof( ItineraryDbContext ).GetTypeInfo().Assembly.GetName().Name;
      services.AddIdentityServer()
              //.AddSigningCredential(cert)
              .AddTemporarySigningCredential()
              .AddAspNetIdentity<IdentityUser>()
              .AddOperationalStore(
                builder => builder.UseSqlite(
                  configuration.GetConnectionString( "SqliteConnection" ),
                  options => options.MigrationsAssembly( migrationsAssembly ) ) )
              .AddConfigurationStore(
                builder => builder.UseSqlite(
                  configuration.GetConnectionString( "SqliteConnection" ),
                  options => options.MigrationsAssembly( migrationsAssembly ) ) );
      //.AddAspNetIdentity<IdentityUser>();
      //.AddProfileService<IdentityWithAdditionalClaimsProfileService>();

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
