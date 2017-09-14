using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Itinerary.Data.EntityFramework.Extensions
{
  public static class DbContextOptionsBuilderExtensions
  {
    private static readonly string MigrationAssemblyName = typeof( ItineraryDbContext )
      .GetTypeInfo()
      .Assembly.GetName()
      .Name;

    public static void InitDbContext(this DbContextOptionsBuilder builder, IConfiguration configuration)
    {
      builder.InitDbContext(configuration.GetConnectionString(Constants.DefaultConnectinStringName));
    }

    public static void InitDbContext(this DbContextOptionsBuilder builder, string connectionString)
    {
      builder.UseSqlite(
        connectionString,
        options => options.MigrationsAssembly(MigrationAssemblyName));
    }
  }
}
