using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO.Compression;
using IdentityServer4.EntityFramework.DbContexts;
using Itinerary.DataAccess.EntityFramework;
using Itinerary.DataAccess.EntityFramework.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Itinerary.Web
{
  public class Startup
  {
    public IConfigurationRoot Configuration { get; }

    public Startup( IHostingEnvironment env, ILoggerFactory loggerFactory )
    {
      Configuration = new ConfigurationBuilder()
        .SetBasePath( env.ContentRootPath )
        .AddJsonFile( "appsettings.json", optional: true, reloadOnChange: true )
        .AddJsonFile( $"appsettings.{env.EnvironmentName}.json", optional: true )
        .AddEnvironmentVariables()
        .Build();

      loggerFactory.AddConsole( Configuration.GetSection( "Logging" ) );
      loggerFactory.AddDebug();
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices( IServiceCollection services )
    {
      if ( string.Equals(
        Configuration[ "EnableCompression" ],
        bool.TrueString,
        StringComparison.CurrentCultureIgnoreCase ) )
      {
        services.Configure<GzipCompressionProviderOptions>(
          options => options.Level = CompressionLevel.Optimal );
        services.AddResponseCompression( options => { options.Providers.Add<GzipCompressionProvider>(); } );
      }

      services.AddMemoryCache();
      services.AddMvc();
      services.AddApiVersioning(
        options =>
        {
          options.ReportApiVersions = true;
          options.AssumeDefaultVersionWhenUnspecified = true;
        } );

      services.AddDatabaseServices( Configuration );
      services.AddIdentityService();
      services.AddIdentityServerService( Configuration );
      services.AddCustomServices( Configuration );
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure( IApplicationBuilder app, IHostingEnvironment env )
    {
      if ( env.IsDevelopment() )
      {
        app.UseDeveloperExceptionPage();
        app.UseWebpackDevMiddleware(
          new WebpackDevMiddlewareOptions
          {
            HotModuleReplacement = true
          } );

        InitializeDatabase( app );
      }
      else
      {
        app.UseExceptionHandler( "/Home/Error" );
      }

      app.UseStaticFiles();
      app.UseIdentity();

      JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
      app.UseIdentityServer();

      app.UseMvc(
        routes =>
        {
          routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}" );

          routes.MapSpaFallbackRoute(
            name: "spa-fallback",
            defaults: new { controller = "Home", action = "Index" } );
        } );
    }

    private static void InitializeDatabase( IApplicationBuilder app )
    {
      using ( IServiceScope serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope() )
      {
        serviceScope.ServiceProvider.GetService<ItineraryDbContext>().Database.Migrate();
        serviceScope.ServiceProvider.GetService<ItineraryDbContext>().EnsureSeedData();
        serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();
        serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>().Database.Migrate();
        serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>().EnsureSeedData();
      }
    }
  }
}
