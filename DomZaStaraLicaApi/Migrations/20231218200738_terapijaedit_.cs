using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class terapijaedit_ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lijek_Terapija_TerapijaId",
                table: "Lijek");

            migrationBuilder.DropIndex(
                name: "IX_Lijek_TerapijaId",
                table: "Lijek");

            migrationBuilder.DropColumn(
                name: "TerapijaId",
                table: "Lijek");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TerapijaId",
                table: "Lijek",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lijek_TerapijaId",
                table: "Lijek",
                column: "TerapijaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lijek_Terapija_TerapijaId",
                table: "Lijek",
                column: "TerapijaId",
                principalTable: "Terapija",
                principalColumn: "TerapijaId");
        }
    }
}
