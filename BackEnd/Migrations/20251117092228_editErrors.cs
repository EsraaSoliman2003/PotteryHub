using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Migrations
{
    /// <inheritdoc />
    public partial class editErrors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 17, 9, 22, 26, 548, DateTimeKind.Utc).AddTicks(9735), "$2a$11$hlnngmZAG8u6pxWjrqi6f./YK8FxzwCqJu2N0NXnadOo/CgDlSiS." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 16, 22, 46, 54, 71, DateTimeKind.Utc).AddTicks(1989), "$2a$11$/.LQ/kwZfkjg1e2FXo8jAORLGmAVxPriqHA4hhWOMkehmgLdCOT2G" });
        }
    }
}
