using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Migrations
{
    /// <inheritdoc />
    public partial class editErrorsModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 17, 9, 48, 11, 415, DateTimeKind.Utc).AddTicks(5086), "$2a$11$WaJOB82t4ygIltvq9GoLd.Lgca7kk3m07PO8O1ZoutbNkHttgASwO" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "PasswordHash" },
                values: new object[] { new DateTime(2025, 11, 17, 9, 22, 26, 548, DateTimeKind.Utc).AddTicks(9735), "$2a$11$hlnngmZAG8u6pxWjrqi6f./YK8FxzwCqJu2N0NXnadOo/CgDlSiS." });
        }
    }
}
