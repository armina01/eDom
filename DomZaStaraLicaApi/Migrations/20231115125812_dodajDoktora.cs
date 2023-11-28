using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class dodajDoktora : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NazivKlinike",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OblastMedicine",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Specijalizacija",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NazivKlinike",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "OblastMedicine",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "Specijalizacija",
                table: "Zaposlenik");
        }
    }
}
