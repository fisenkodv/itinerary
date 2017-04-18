using Itinerary.DataAccess.Domain;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Itinerary.DataAccess.Entities.Configurations
{
  internal static class PlacePlaceCategoryConfig
  {
    public static void Configure( this EntityTypeBuilder<PlacePlaceCategory> entity )
    {
      entity.HasKey( p => p.Id );

      entity.HasOne( pt => pt.Place )
            .WithMany( p => p.CategoriesLink )
            .HasForeignKey( pt => pt.PlaceId );

      entity.HasOne( pt => pt.Category )
            .WithMany( t => t.PlacesLink )
            .HasForeignKey( pt => pt.CategoryId );
    }
  }
}
