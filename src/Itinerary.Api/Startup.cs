using System;
using Itinerary.Api.Extensions;
using Itinerary.Data.EntityFramework;
using Itinerary.Data.EntityFramework.Extensions;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Itinerary.Api
{
  [UsedImplicitly]
  public class Startup : IStartup
  {
    private readonly IHostingEnvironment _hostingEnvironment;
    private readonly IConfiguration _configuration;

    public Startup(
      IHostingEnvironment hostingEnvironment,
      IConfiguration configuration,
      ILoggerFactory loggerFactory)
    {
      _hostingEnvironment = hostingEnvironment;
      _configuration = configuration;

      loggerFactory.AddConsole(_configuration.GetSection("Logging"));
      loggerFactory.AddDebug();
    }

    /// <summary>
    /// This method gets called by the runtime. Use this method to add services to the container.
    /// </summary>
    public IServiceProvider ConfigureServices(IServiceCollection services)
    {
      services.AddCompression(_configuration);
      services.AddMemoryCache();
      services.AddMvc();

      services.AddApiVersioning(
        options =>
        {
          options.ReportApiVersions = true;
          options.AssumeDefaultVersionWhenUnspecified = true;
        });

      services.AddCors(
        options => options.AddPolicy(
          "AllowAllOrigins",
          builder => builder.AllowAnyOrigin()));

      services.AddPersistentStorage(_configuration);

      services.AddSecurity(_configuration);
      services.AddCustomServices(_configuration);

      return services.BuildServiceProvider();
    }

    /// <summary>
    /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    /// </summary>
    public void Configure(IApplicationBuilder app)
    {
      InitializeDatabase(app);

      app.UseCors("AllowAllOrigins");
      app.UseAuthentication();
      app.UseMvc();
    }

    private void InitializeDatabase(IApplicationBuilder app)
    {
      using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
      {
        var itineraryDbContext = serviceScope.ServiceProvider.GetService<ItineraryDbContext>();
        itineraryDbContext.Database.Migrate();
        itineraryDbContext.EnsureSeedData(_hostingEnvironment);
      }
    }
  }
}
