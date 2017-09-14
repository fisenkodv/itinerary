using Itinerary.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Itinerary.Data.EntityFramework.Configurations
{
  public static class ReviewConfig
  {
    public static void Configure(this EntityTypeBuilder<Review> entity)
    {
      entity.HasKey(x => x.Id);
      entity.Property(x => x.Comment).HasMaxLength(4000);
      entity.HasOne(x => x.Place).WithMany(x => x.Reviews);

      entity.ToTable("Reviews");
    }
  }
}
