using Itinerary.Business.Api.Google;
using Itinerary.Business.Services.Places;
using Itinerary.DataAccess.Abstract.UnitOfWork;
using Itinerary.DataAccess.EntityFramework;
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
        options => options.UseSqlite( configuration.GetConnectionString( "SqliteConnection" ) ) );

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
