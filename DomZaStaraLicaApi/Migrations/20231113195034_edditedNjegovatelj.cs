using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class edditedNjegovatelj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isMedicinskiTehnicar",
                table: "Zaposlenik",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isNjegovatelj",
                table: "Zaposlenik",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isMedicinskiTehnicar",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "isNjegovatelj",
                table: "Zaposlenik");
        }
    }
}
