using System;
using System.IO.Compression;
using Itinerary.Business;
using Itinerary.Business.Identity;
using Itinerary.Business.Identity.Abstractions;
using Itinerary.Business.Places;
using Itinerary.Business.Places.Abstractions;
using Itinerary.DataAccess.Entities;
using Itinerary.DataAccess.EntityFramework;
using Itinerary.DataAccess.Extensions;
using Itinerary.GoogleApiClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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

    public static IServiceCollection AddIdentityService( this IServiceCollection services )
    {
      services.AddIdentity<User, Role>(
                 identityOptions =>
                 {
                   //TODO: FIX!
                   //identityOptions.Cookies.ApplicationCookie.Events =
                   //  new CookieAuthenticationEvents
                   //  {
                   //    OnRedirectToLogin =
                   //      context =>
                   //      {
                   //        if ( context.Request.Path.StartsWithSegments( "/api" ) )
                   //          context.Response.StatusCode = ( int ) HttpStatusCode.Unauthorized;
                   //        else
                   //          context.Response.Redirect( context.RedirectUri );

                   //        return Task.CompletedTask;
                   //      }
                   //  };
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
      //services.AddIdentityServer()
      //         .AddSigningCredential( CertificatesExtensions.RootCertificate )
      //         .AddAspNetIdentity<User>()
      //         .AddOperationalStore( builder => builder.InitDbContext( configuration ) )
      //         .AddConfigurationStore( builder => builder.InitDbContext( configuration ) );

      return services;
    }

    public static IServiceCollection AddCustomServices(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddSingleton( configuration.GetGoogleClientSecrets() );

      services.AddTransient( typeof( IUnitOfWork ), typeof( UnitOfWork ) );
      services.AddTransient<IPlacesService, PlacesService>();
      services.AddTransient<IGooglePlacesClient, GooglePlacesClient>();
      services.AddTransient<IAccountService, AccountService>();

      return services;
    }
  }
}
