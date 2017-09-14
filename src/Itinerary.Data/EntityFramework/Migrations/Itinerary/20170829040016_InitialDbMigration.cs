using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Itinerary.Data.EntityFramework.Migrations.Itinerary
{
  public partial class InitialDbMigration : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
        name: "AspNetRoles",
        columns: table => new
                          {
                            Id = table.Column<long>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                            Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                            NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true)
                          },
        constraints: table => { table.PrimaryKey("PK_AspNetRoles", x => x.Id); });

      migrationBuilder.CreateTable(
        name: "AspNetUsers",
        columns: table => new
                          {
                            Id = table.Column<long>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false),
                            ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                            Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                            EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                            LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                            LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                            NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                            NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                            PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                            PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                            PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                            SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                            TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                            UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true)
                          },
        constraints: table => { table.PrimaryKey("PK_AspNetUsers", x => x.Id); });

      migrationBuilder.CreateTable(
        name: "PlaceCategories",
        columns: table => new
                          {
                            Id = table.Column<long>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: true)
                          },
        constraints: table => { table.PrimaryKey("PK_PlaceCategories", x => x.Id); });

      migrationBuilder.CreateTable(
        name: "Places",
        columns: table => new
                          {
                            Id = table.Column<long>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            ImgUrl = table.Column<string>(type: "TEXT", maxLength: 512, nullable: true),
                            Latitude = table.Column<double>(type: "REAL", nullable: false),
                            Longitude = table.Column<double>(type: "REAL", nullable: false),
                            Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                            Rating = table.Column<double>(type: "REAL", nullable: false),
                            Url = table.Column<string>(type: "TEXT", maxLength: 512, nullable: true)
                          },
        constraints: table => { table.PrimaryKey("PK_Places", x => x.Id); });

      migrationBuilder.CreateTable(
        name: "AspNetRoleClaims",
        columns: table => new
                          {
                            Id = table.Column<int>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                            ClaimValue = table.Column<string>(type: "TEXT", nullable: true),
                            RoleId = table.Column<long>(type: "INTEGER", nullable: false)
                          },
        constraints: table =>
                     {
                       table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                       table.ForeignKey(
                         name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                         column: x => x.RoleId,
                         principalTable: "AspNetRoles",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Cascade);
                     });

      migrationBuilder.CreateTable(
        name: "AspNetUserClaims",
        columns: table => new
                          {
                            Id = table.Column<int>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                            ClaimValue = table.Column<string>(type: "TEXT", nullable: true),
                            UserId = table.Column<long>(type: "INTEGER", nullable: false)
                          },
        constraints: table =>
                     {
                       table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                       table.ForeignKey(
                         name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                         column: x => x.UserId,
                         principalTable: "AspNetUsers",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Cascade);
                     });

      migrationBuilder.CreateTable(
        name: "AspNetUserLogins",
        columns: table => new
                          {
                            LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                            ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                            ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                            UserId = table.Column<long>(type: "INTEGER", nullable: false)
                          },
        constraints: table =>
                     {
                       table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                       table.ForeignKey(
                         name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                         column: x => x.UserId,
                         principalTable: "AspNetUsers",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Cascade);
                     });

      migrationBuilder.CreateTable(
        name: "AspNetUserRoles",
        columns: table => new
                          {
                            UserId = table.Column<long>(type: "INTEGER", nullable: false),
                            RoleId = table.Column<long>(type: "INTEGER", nullable: false)
                          },
        constraints: table =>
                     {
                       table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                       table.ForeignKey(
                         name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                         column: x => x.RoleId,
                         principalTable: "AspNetRoles",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Cascade);
                       table.ForeignKey(
                         name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                         column: x => x.UserId,
                         principalTable: "AspNetUsers",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Cascade);
                     });

      migrationBuilder.CreateTable(
        name: "AspNetUserTokens",
        columns: table => new
                          {
                            UserId = table.Column<long>(type: "INTEGER", nullable: false),
                            LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                            Name = table.Column<string>(type: "TEXT", nullable: false),
                            Value = table.Column<string>(type: "TEXT", nullable: true)
                          },
        constraints: table =>
                     {
                       table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                       table.ForeignKey(
                         name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                         column: x => x.UserId,
                         principalTable: "AspNetUsers",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Cascade);
                     });

      migrationBuilder.CreateTable(
        name: "Itineraries",
        columns: table => new
                          {
                            Id = table.Column<long>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                            UserId = table.Column<long>(type: "INTEGER", nullable: true)
                          },
        constraints: table =>
                     {
                       table.PrimaryKey("PK_Itineraries", x => x.Id);
                       table.ForeignKey(
                         name: "FK_Itineraries_AspNetUsers_UserId",
                         column: x => x.UserId,
                         principalTable: "AspNetUsers",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Restrict);
                     });

      migrationBuilder.CreateTable(
        name: "PlacePlaceCategories",
        columns: table => new
                          {
                            Id = table.Column<long>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            CategoryId = table.Column<long>(type: "INTEGER", nullable: false),
                            PlaceId = table.Column<long>(type: "INTEGER", nullable: false)
                          },
        constraints: table =>
                     {
                       table.PrimaryKey("PK_PlacePlaceCategories", x => x.Id);
                       table.ForeignKey(
                         name: "FK_PlacePlaceCategories_PlaceCategories_CategoryId",
                         column: x => x.CategoryId,
                         principalTable: "PlaceCategories",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Cascade);
                       table.ForeignKey(
                         name: "FK_PlacePlaceCategories_Places_PlaceId",
                         column: x => x.PlaceId,
                         principalTable: "Places",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Cascade);
                     });

      migrationBuilder.CreateTable(
        name: "Reviews",
        columns: table => new
                          {
                            Id = table.Column<long>(type: "INTEGER", nullable: false)
                                      .Annotation("Sqlite:Autoincrement", true),
                            Comment = table.Column<string>(type: "TEXT", maxLength: 4000, nullable: true),
                            PlaceId = table.Column<long>(type: "INTEGER", nullable: true),
                            Rating = table.Column<int>(type: "INTEGER", nullable: false)
                          },
        constraints: table =>
                     {
                       table.PrimaryKey("PK_Reviews", x => x.Id);
                       table.ForeignKey(
                         name: "FK_Reviews_Places_PlaceId",
                         column: x => x.PlaceId,
                         principalTable: "Places",
                         principalColumn: "Id",
                         onDelete: ReferentialAction.Restrict);
                     });

      migrationBuilder.CreateIndex(
        name: "IX_AspNetRoleClaims_RoleId",
        table: "AspNetRoleClaims",
        column: "RoleId");

      migrationBuilder.CreateIndex(
        name: "RoleNameIndex",
        table: "AspNetRoles",
        column: "NormalizedName",
        unique: true);

      migrationBuilder.CreateIndex(
        name: "IX_AspNetUserClaims_UserId",
        table: "AspNetUserClaims",
        column: "UserId");

      migrationBuilder.CreateIndex(
        name: "IX_AspNetUserLogins_UserId",
        table: "AspNetUserLogins",
        column: "UserId");

      migrationBuilder.CreateIndex(
        name: "IX_AspNetUserRoles_RoleId",
        table: "AspNetUserRoles",
        column: "RoleId");

      migrationBuilder.CreateIndex(
        name: "EmailIndex",
        table: "AspNetUsers",
        column: "NormalizedEmail");

      migrationBuilder.CreateIndex(
        name: "UserNameIndex",
        table: "AspNetUsers",
        column: "NormalizedUserName",
        unique: true);

      migrationBuilder.CreateIndex(
        name: "IX_Itineraries_UserId",
        table: "Itineraries",
        column: "UserId");

      migrationBuilder.CreateIndex(
        name: "IX_PlacePlaceCategories_CategoryId",
        table: "PlacePlaceCategories",
        column: "CategoryId");

      migrationBuilder.CreateIndex(
        name: "IX_PlacePlaceCategories_PlaceId",
        table: "PlacePlaceCategories",
        column: "PlaceId");

      migrationBuilder.CreateIndex(
        name: "IX_Reviews_PlaceId",
        table: "Reviews",
        column: "PlaceId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
        name: "AspNetRoleClaims");

      migrationBuilder.DropTable(
        name: "AspNetUserClaims");

      migrationBuilder.DropTable(
        name: "AspNetUserLogins");

      migrationBuilder.DropTable(
        name: "AspNetUserRoles");

      migrationBuilder.DropTable(
        name: "AspNetUserTokens");

      migrationBuilder.DropTable(
        name: "Itineraries");

      migrationBuilder.DropTable(
        name: "PlacePlaceCategories");

      migrationBuilder.DropTable(
        name: "Reviews");

      migrationBuilder.DropTable(
        name: "AspNetRoles");

      migrationBuilder.DropTable(
        name: "AspNetUsers");

      migrationBuilder.DropTable(
        name: "PlaceCategories");

      migrationBuilder.DropTable(
        name: "Places");
    }
  }
}
