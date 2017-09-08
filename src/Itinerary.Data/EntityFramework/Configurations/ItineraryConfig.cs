using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Itinerary.Data.EntityFramework.Configurations
{
  internal static class ItineraryConfig
  {
    public static void Configure( this EntityTypeBuilder<Entity.Itinerary> entity )
    {
      entity.HasKey( x => x.Id );
      entity.Property( x => x.Name ).HasMaxLength( 256 );

      entity.HasOne( x => x.User ).WithMany( x => x.Itineraries );

      entity.ToTable( "Itineraries" );
    }
  }
}
