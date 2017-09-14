using Itinerary.Business.Identity;
using Itinerary.Business.Places;
using Itinerary.Business.Places.Abstractions;
using Itinerary.Data.Repository;
using Itinerary.GoogleApiClient;
using Itinerary.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Itinerary.Api.Extensions
{
  public static class ServicesExtensions
  {
    public static IServiceCollection AddCustomServices(
      this IServiceCollection services,
      IConfiguration configuration)
    {
      services.AddSingleton(configuration.GetGoogleClientSecrets());

      services.AddTransient<IPlacesRepository, PlacesRepository>();
      services.AddTransient<IPlacesService, PlacesService>();
      services.AddTransient<IGooglePlacesClient, GooglePlacesClient>();
      services.AddTransient<IAccountService, AccountService>();

      return services;
    }
  }
}
