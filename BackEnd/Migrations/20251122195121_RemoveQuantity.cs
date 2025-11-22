using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Migrations
{
    /// <inheritdoc />
    public partial class RemoveQuantity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Products");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 22, 19, 51, 20, 917, DateTimeKind.Utc).AddTicks(45), "$2a$11$C5ofQfif0sdgGPsxXUpDceGTqlOSDACmiTruwB6nmtEXuBCDOULeS" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
