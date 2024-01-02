using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class tblTerapijaEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KorisnikDomaID",
                table: "Terapija",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Terapija_KorisnikDomaID",
                table: "Terapija",
                column: "KorisnikDomaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Terapija_KorisnikDoma_KorisnikDomaID",
                table: "Terapija",
                column: "KorisnikDomaID",
                principalTable: "KorisnikDoma",
                principalColumn: "KorisnikDomaID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Terapija_KorisnikDoma_KorisnikDomaID",
                table: "Terapija");

            migrationBuilder.DropIndex(
                name: "IX_Terapija_KorisnikDomaID",
                table: "Terapija");

            migrationBuilder.DropColumn(
                name: "KorisnikDomaID",
                table: "Terapija");
        }
    }
}
