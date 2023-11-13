using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class addNjegovatelj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "NjegovateljID",
                table: "Zaposlenik",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "brojPacijenata",
                table: "Zaposlenik",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "NjegovateljID",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "brojPacijenata",
                table: "Zaposlenik");
        }
    }
}
