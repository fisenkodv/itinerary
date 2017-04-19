using Itinerary.DataAccess.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Itinerary.DataAccess.EntityFramework.Configurations
{
  internal static class PlacePlaceCategoryConfig
  {
    public static void Configure( this EntityTypeBuilder<PlacePlaceCategory> entity )
    {
      entity.HasKey( p => p.Id );

      entity.HasOne( pt => pt.Place )
            .WithMany( p => p.Categories )
            .HasForeignKey( pt => pt.PlaceId );

      entity.HasOne( pt => pt.Category )
            .WithMany( t => t.Places )
            .HasForeignKey( pt => pt.CategoryId );
    }
  }
}
