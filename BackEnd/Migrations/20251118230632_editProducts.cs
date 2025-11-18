using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Migrations
{
    /// <inheritdoc />
    public partial class editProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Dimensions",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl2",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl3",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl4",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl5",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Quantity",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 18, 23, 6, 31, 256, DateTimeKind.Utc).AddTicks(5651), "$2a$11$oAU4O78btQmXLy1cCHQf.OzNnyqEnhhrev6VF611dLlN.bR/ROeCS" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dimensions",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageUrl2",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageUrl3",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageUrl4",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImageUrl5",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Products");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 17, 9, 48, 11, 415, DateTimeKind.Utc).AddTicks(5086), "$2a$11$WaJOB82t4ygIltvq9GoLd.Lgca7kk3m07PO8O1ZoutbNkHttgASwO" });
        }
    }
}
