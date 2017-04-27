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

      services.AddIdentityServer()
              //.AddSigningCredential(cert)
              .AddTemporarySigningCredential()
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
