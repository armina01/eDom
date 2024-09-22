using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class tblFizioTerapija : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "FizioTerapija",
                columns: table => new
                {
                    FizioTerapijaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumPostavke = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    KorisnikDomaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FizioTerapija", x => x.FizioTerapijaId);
                    table.ForeignKey(
                        name: "FK_FizioTerapija_KorisnikDoma_KorisnikDomaID",
                        column: x => x.KorisnikDomaID,
                        principalTable: "KorisnikDoma",
                        principalColumn: "KorisnikDomaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FizioTerapija_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

         

            migrationBuilder.CreateIndex(
                name: "IX_FizioTerapija_KorisnikDomaID",
                table: "FizioTerapija",
                column: "KorisnikDomaID");

            migrationBuilder.CreateIndex(
                name: "IX_FizioTerapija_ZaposlenikId",
                table: "FizioTerapija",
                column: "ZaposlenikId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.DropTable(
                name: "FizioTerapija");
        }
    }
}
