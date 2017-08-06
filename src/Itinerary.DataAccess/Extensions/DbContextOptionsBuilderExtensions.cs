using System.Reflection;
using Itinerary.DataAccess.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Itinerary.DataAccess.Extensions
{
  public static class DbContextOptionsBuilderExtensions
  {
    private static readonly string MigrationAssemblyName = typeof( ItineraryDbContext )
      .GetTypeInfo()
      .Assembly.GetName()
      .Name;

    public static void InitDbContext( this DbContextOptionsBuilder builder, IConfiguration configuration )
    {
      builder.UseSqlite(
        configuration.GetConnectionString( "SqliteConnection" ),
        options => options.MigrationsAssembly( MigrationAssemblyName ) );
    }
  }
}
