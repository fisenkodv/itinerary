using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Models;
using Itinerary.DataAccess.EntityFramework;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
      //services.Configure<GzipCompressionProviderOptions>(
      //  options => options.Level = CompressionLevel.Optimal );
      //services.AddResponseCompression( options => { options.Providers.Add<GzipCompressionProvider>(); } );

      services.AddMemoryCache();
      services.AddMvc();

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
        var itineraryDbContext = serviceScope.ServiceProvider.GetService<ItineraryDbContext>();
        itineraryDbContext.Database.EnsureCreated();
        itineraryDbContext.Database.Migrate();

        serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

        var context = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
        context.Database.Migrate();
        if ( !context.Clients.Any() )
        {
          foreach ( Client client in Clients.Get() )
            context.Clients.Add( client.ToEntity() );

          context.SaveChanges();
        }

        if ( !context.IdentityResources.Any() )
        {
          foreach ( IdentityResource resource in Resources.GetIdentityResources() )
            context.IdentityResources.Add( resource.ToEntity() );

          context.SaveChanges();
        }

        if ( !context.ApiResources.Any() )
        {
          foreach ( ApiResource resource in Resources.GetApiResources() )
            context.ApiResources.Add( resource.ToEntity() );

          context.SaveChanges();
        }
      }
    }
  }
}
