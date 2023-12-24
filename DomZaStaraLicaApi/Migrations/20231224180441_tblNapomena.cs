using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class tblNapomena : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VrstaNapomene",
                columns: table => new
                {
                    VrstaNapomeneId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VrstaNapomene", x => x.VrstaNapomeneId);
                });

            migrationBuilder.CreateTable(
                name: "Napomena",
                columns: table => new
                {
                    NapomenaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prioritet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumPostavke = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    KorisnikDomaID = table.Column<int>(type: "int", nullable: false),
                    VrstaNapomeneId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Napomena", x => x.NapomenaId);
                    table.ForeignKey(
                        name: "FK_Napomena_KorisnikDoma_KorisnikDomaID",
                        column: x => x.KorisnikDomaID,
                        principalTable: "KorisnikDoma",
                        principalColumn: "KorisnikDomaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Napomena_VrstaNapomene_VrstaNapomeneId",
                        column: x => x.VrstaNapomeneId,
                        principalTable: "VrstaNapomene",
                        principalColumn: "VrstaNapomeneId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Napomena_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Napomena_KorisnikDomaID",
                table: "Napomena",
                column: "KorisnikDomaID");

            migrationBuilder.CreateIndex(
                name: "IX_Napomena_VrstaNapomeneId",
                table: "Napomena",
                column: "VrstaNapomeneId");

            migrationBuilder.CreateIndex(
                name: "IX_Napomena_ZaposlenikId",
                table: "Napomena",
                column: "ZaposlenikId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Napomena");

            migrationBuilder.DropTable(
                name: "VrstaNapomene");
        }
    }
}
