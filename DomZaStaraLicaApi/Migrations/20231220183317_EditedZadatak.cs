using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class EditedZadatak : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KorisnikDomaId",
                table: "Zadatak",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Dijagnoza",
                columns: table => new
                {
                    dijagnozaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nazivBolesti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datumDijagnoze = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    KorisnikDomaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dijagnoza", x => x.dijagnozaId);
                    table.ForeignKey(
                        name: "FK_Dijagnoza_KorisnikDoma_KorisnikDomaID",
                        column: x => x.KorisnikDomaID,
                        principalTable: "KorisnikDoma",
                        principalColumn: "KorisnikDomaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dijagnoza_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Zadatak_KorisnikDomaId",
                table: "Zadatak",
                column: "KorisnikDomaId");

            migrationBuilder.CreateIndex(
                name: "IX_Dijagnoza_KorisnikDomaID",
                table: "Dijagnoza",
                column: "KorisnikDomaID");

            migrationBuilder.CreateIndex(
                name: "IX_Dijagnoza_ZaposlenikId",
                table: "Dijagnoza",
                column: "ZaposlenikId");

            migrationBuilder.AddForeignKey(
                name: "FK_Zadatak_KorisnikDoma_KorisnikDomaId",
                table: "Zadatak",
                column: "KorisnikDomaId",
                principalTable: "KorisnikDoma",
                principalColumn: "KorisnikDomaID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zadatak_KorisnikDoma_KorisnikDomaId",
                table: "Zadatak");

            migrationBuilder.DropTable(
                name: "Dijagnoza");

            migrationBuilder.DropIndex(
                name: "IX_Zadatak_KorisnikDomaId",
                table: "Zadatak");

            migrationBuilder.DropColumn(
                name: "KorisnikDomaId",
                table: "Zadatak");
        }
    }
}
