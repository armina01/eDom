using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class addZaposlenik : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KorisnickiNalog",
                columns: table => new
                {
                    NalogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lozinka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JeAdmin = table.Column<bool>(type: "bit", nullable: false),
                    JeKorisnikDoma = table.Column<bool>(type: "bit", nullable: false),
                    JeNjegovatelj = table.Column<bool>(type: "bit", nullable: false),
                    JeFizioterapeut = table.Column<bool>(type: "bit", nullable: false),
                    JeNutricionista = table.Column<bool>(type: "bit", nullable: false),
                    JeDoktor = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnickiNalog", x => x.NalogId);
                });

            migrationBuilder.CreateTable(
                name: "PoslovnaPozicija",
                columns: table => new
                {
                    PozicijaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpisPosla = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojSati = table.Column<int>(type: "int", nullable: false),
                    Zvanje = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoslovnaPozicija", x => x.PozicijaId);
                });

            migrationBuilder.CreateTable(
                name: "Zaposlenik",
                columns: table => new
                {
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImePrezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JMBG = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumZaposlenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NalogId = table.Column<int>(type: "int", nullable: false),
                    PoslovnaPozicijaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zaposlenik", x => x.ZaposlenikId);
                    table.ForeignKey(
                        name: "FK_Zaposlenik_KorisnickiNalog_NalogId",
                        column: x => x.NalogId,
                        principalTable: "KorisnickiNalog",
                        principalColumn: "NalogId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Zaposlenik_PoslovnaPozicija_PoslovnaPozicijaId",
                        column: x => x.PoslovnaPozicijaId,
                        principalTable: "PoslovnaPozicija",
                        principalColumn: "PozicijaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Zaposlenik_NalogId",
                table: "Zaposlenik",
                column: "NalogId");

            migrationBuilder.CreateIndex(
                name: "IX_Zaposlenik_PoslovnaPozicijaId",
                table: "Zaposlenik",
                column: "PoslovnaPozicijaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Zaposlenik");

            migrationBuilder.DropTable(
                name: "KorisnickiNalog");

            migrationBuilder.DropTable(
                name: "PoslovnaPozicija");
        }
    }
}
