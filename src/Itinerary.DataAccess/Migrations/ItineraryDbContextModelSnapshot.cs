using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Itinerary.DataAccess;

namespace Itinerary.DataAccess.Migrations
{
    [DbContext(typeof(ItineraryDbContext))]
    partial class ItineraryDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1");

            modelBuilder.Entity("Itinerary.DataAccess.Entities.Place", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ImgUrl");

                    b.Property<double>("Latitude");

                    b.Property<double>("Longitude");

                    b.Property<string>("Name");

                    b.Property<float>("Rating");

                    b.Property<int>("Reviews");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.ToTable("Place");
                });

            modelBuilder.Entity("Itinerary.DataAccess.Entities.PlaceCategory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("PlaceCategory");
                });

            modelBuilder.Entity("Itinerary.DataAccess.Entities.PlacePlaceCategory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("CategoryId");

                    b.Property<long>("PlaceId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("PlaceId");

                    b.ToTable("PlacePlaceCategory");
                });

            modelBuilder.Entity("Itinerary.DataAccess.Entities.PlacePlaceCategory", b =>
                {
                    b.HasOne("Itinerary.DataAccess.Entities.PlaceCategory", "Category")
                        .WithMany("PlacesLink")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Itinerary.DataAccess.Entities.Place", "Place")
                        .WithMany("CategoriesLink")
                        .HasForeignKey("PlaceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
