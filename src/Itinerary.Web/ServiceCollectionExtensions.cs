using Itinerary.DataAccess.Interfaces;
using Itinerary.DataAccess.LiteDB;
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
      services.AddTransient( typeof( IRepository<> ), typeof( LiteDbRepository<> ) );
      services.AddSingleton<IUnitOfWork>(
        new LiteDbUnitOfWork( configuration.GetConnectionString( "DefaultConnection" ) ) );

      return services;
    }
  }
}