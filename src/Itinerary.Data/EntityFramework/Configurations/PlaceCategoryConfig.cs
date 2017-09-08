using Itinerary.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Itinerary.Data.EntityFramework.Configurations
{
  internal static class PlaceCategoryConfig
  {
    public static void Configure( this EntityTypeBuilder<PlaceCategory> entity )
    {
      entity.HasKey( x => x.Id );
      entity.Property( x => x.Name ).HasMaxLength( 128 );

      entity.ToTable( "PlaceCategories" );
    }
  }
}
