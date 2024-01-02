using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class tblTerapijaUpdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Terapija_Lijek_LijekId",
                table: "Terapija");

            migrationBuilder.DropIndex(
                name: "IX_Terapija_LijekId",
                table: "Terapija");

            migrationBuilder.DropColumn(
                name: "LijekId",
                table: "Terapija");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LijekId",
                table: "Terapija",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Terapija_LijekId",
                table: "Terapija",
                column: "LijekId");

            migrationBuilder.AddForeignKey(
                name: "FK_Terapija_Lijek_LijekId",
                table: "Terapija",
                column: "LijekId",
                principalTable: "Lijek",
                principalColumn: "LijekId");
        }
    }
}
