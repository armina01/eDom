using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class eddKorisnickiNalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_KorisnickiNalog_NalogId",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "JeKorisnikDoma",
                table: "KorisnickiNalog");

            migrationBuilder.RenameColumn(
                name: "NalogId",
                table: "KorisnickiNalog",
                newName: "KorisnikId");

            migrationBuilder.AlterColumn<int>(
                name: "NalogId",
                table: "Zaposlenik",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_KorisnickiNalog_NalogId",
                table: "Zaposlenik",
                column: "NalogId",
                principalTable: "KorisnickiNalog",
                principalColumn: "KorisnikId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zaposlenik_KorisnickiNalog_NalogId",
                table: "Zaposlenik");

            migrationBuilder.RenameColumn(
                name: "KorisnikId",
                table: "KorisnickiNalog",
                newName: "NalogId");

            migrationBuilder.AlterColumn<int>(
                name: "NalogId",
                table: "Zaposlenik",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "JeKorisnikDoma",
                table: "KorisnickiNalog",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Zaposlenik_KorisnickiNalog_NalogId",
                table: "Zaposlenik",
                column: "NalogId",
                principalTable: "KorisnickiNalog",
                principalColumn: "NalogId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
