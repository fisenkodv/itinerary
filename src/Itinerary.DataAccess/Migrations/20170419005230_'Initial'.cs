using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Itinerary.DataAccess.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Place",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImgUrl = table.Column<string>(nullable: true),
                    Latitude = table.Column<double>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Rating = table.Column<float>(nullable: false),
                    Reviews = table.Column<int>(nullable: false),
                    Url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Place", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlaceCategory",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceCategory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlacePlaceCategory",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CategoryId = table.Column<long>(nullable: false),
                    PlaceId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlacePlaceCategory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlacePlaceCategory_PlaceCategory_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "PlaceCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlacePlaceCategory_Place_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "Place",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlacePlaceCategory_CategoryId",
                table: "PlacePlaceCategory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PlacePlaceCategory_PlaceId",
                table: "PlacePlaceCategory",
                column: "PlaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlacePlaceCategory");

            migrationBuilder.DropTable(
                name: "PlaceCategory");

            migrationBuilder.DropTable(
                name: "Place");
        }
    }
}
