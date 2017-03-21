using System.IO.Compression;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.Webpack;
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
      services.Configure<GzipCompressionProviderOptions>(
        options => options.Level = CompressionLevel.Optimal );
      services.AddResponseCompression( options => { options.Providers.Add<GzipCompressionProvider>(); } );

      services.AddMemoryCache();
      services.AddMvc();

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
      }
      else
      {
        app.UseExceptionHandler( "/Home/Error" );
      }

      app.UseResponseCompression();
      app.UseStaticFiles();

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
  }
}