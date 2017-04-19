using Itinerary.Business.Api.Google;
using Itinerary.Business.Services.Places;
using Itinerary.DataAccess;
using Itinerary.DataAccess.Abstract.Repository;
using Itinerary.DataAccess.EntityFramework;
using Itinerary.DataAccess.EntityFramework.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Itinerary.Web
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddCustomServices(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddSingleton( configuration.GetGoogleClientSecrets() );

      //      services.AddSingleton<IRepositoryConfiguration>(
      //        new RepositoryConfiguration( configuration.GetConnectionString( "DefaultConnection" ) ) );

      services.AddDbContext<ItineraryDbContext>(
        options => options.UseSqlite( configuration.GetConnectionString( "DefaultConnection" ) ) );
      //services.AddTransient( typeof( DbContext ), typeof( ItineraryDbContext ) );
      services.AddTransient( typeof( IPlacesRepository ), typeof( PlacesRepository ) );

      services.AddTransient<IPlacesService, PlacesService>();
      services.AddTransient<IGooglePlacesService, GooglePlacesService>();

      return services;
    }
  }
}
