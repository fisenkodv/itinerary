using System;
using System.IO.Compression;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using Itinerary.Business;
using Itinerary.Business.Identity;
using Itinerary.Business.Identity.Abstractions;
using Itinerary.Business.Places;
using Itinerary.Business.Places.Abstractions;
using Itinerary.DataAccess.Entities;
using Itinerary.DataAccess.EntityFramework;
using Itinerary.ExternalApiClient.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Itinerary.Api.Extensions
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
      services.AddIdentity<User, Role>(
                identityOptions =>
                {
                  identityOptions.Cookies.ApplicationCookie.Events =
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
                }
              )
              .AddEntityFrameworkStores<ItineraryDbContext, long>()
              .AddDefaultTokenProviders();

      return services;
    }

    public static IServiceCollection AddIdentityServerService(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddIdentityServer()
              .AddSigningCredential( CertificatesExtensions.RootCertificate )
              .AddAspNetIdentity<User>()
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
      //services.AddTransient<IGooglePlacesService, GooglePlacesService>();
      services.AddTransient<IAccountService, AccountService>();

      return services;
    }
  }
}
