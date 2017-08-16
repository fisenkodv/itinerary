using Itinerary.Api.Extensions;
using Itinerary.DataAccess.EntityFramework;
using Itinerary.DataAccess.EntityFramework.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Itinerary.Api
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
      services.AddCompression( Configuration );
      services.AddMemoryCache();
      services.AddMvc();
      //services.AddApiVersioning(
      //  options =>
      //  {
      //    options.ReportApiVersions = true;
      //    options.AssumeDefaultVersionWhenUnspecified = true;
      //  } );
      services.AddCors(
        options => options.AddPolicy(
          "AllowAllOrigins",
          builder => { builder.AllowAnyOrigin(); } ) );

      services.AddDatabaseServices( Configuration );

      services.AddIdentity( Configuration );
      services.AddCustomServices( Configuration );
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure( IApplicationBuilder app, IHostingEnvironment env )
    {
      InitializeDatabase( app, env );

      app.UseCors( "AllowAllOrigins" );
      app.UseAuthentication();
      app.UseMvc();
    }

    private static void InitializeDatabase( IApplicationBuilder app, IHostingEnvironment env )
    {
      using ( IServiceScope serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope() )
      {
        serviceScope.ServiceProvider.GetService<ItineraryDbContext>().Database.Migrate();
        serviceScope.ServiceProvider.GetService<ItineraryDbContext>().EnsureSeedData( env );
      }
    }
  }
}
