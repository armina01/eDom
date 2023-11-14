using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class edditedPoslovnaPozicija : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PozicijaId",
                table: "PoslovnaPozicija",
                newName: "PoslovnaPozicijaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PoslovnaPozicijaId",
                table: "PoslovnaPozicija",
                newName: "PozicijaId");
        }
    }
}
