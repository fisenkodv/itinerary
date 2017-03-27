using Itinerary.Business.Api.Google;
using Itinerary.Business.Services.Places;
using Itinerary.DataAccess.Repository;
using Itinerary.DataAccess.Repository.Interfaces;
using Itinerary.DataAccess.Repository.Interfaces.Generic;
using Itinerary.DataAccess.Repository.LiteDb;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Itinerary.Web
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddCustomServices(
      this IServiceCollection services,
      IConfiguration configuration )
    {
      services.AddSingleton( configuration.GetGoogleClientSecrets() );

      services.AddSingleton<IRepositoryConfiguration>(
        new RepositoryConfiguration( configuration.GetConnectionString( "DefaultConnection" ) ) );

      services.AddTransient( typeof( IGuidKeyRepository<> ), typeof( LiteDbRepository<> ) );
      services.AddTransient( typeof( IPlacesRepository ), typeof( PlacesRepository ) );

      services.AddTransient<IPlacesService, PlacesService>();
      services.AddTransient<IGooglePlacesService, GooglePlacesService>();

      return services;
    }
  }
}
