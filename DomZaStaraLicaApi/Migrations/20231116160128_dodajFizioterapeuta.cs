using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class dodajFizioterapeuta : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Doktor_Specijalizacija",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OblastFizijatrije",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Doktor_Specijalizacija",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "OblastFizijatrije",
                table: "Zaposlenik");
        }
    }
}
