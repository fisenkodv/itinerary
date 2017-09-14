using Itinerary.Data.EntityFramework;
using Itinerary.Data.EntityFramework.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Itinerary.Api.Extensions
{
  internal static class PersistentStorageExtentions
  {
    public static IServiceCollection AddPersistentStorage(
      this IServiceCollection services,
      IConfiguration configuration)
    {
      services.AddEntityFrameworkSqlite();
      services.AddDbContextPool<ItineraryDbContext>(builder => builder.InitDbContext(configuration));

      return services;
    }
  }
}
