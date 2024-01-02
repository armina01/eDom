using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class Zadatak : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IntervalZadatka",
                columns: table => new
                {
                    IntervalZadatkaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JeDnevni = table.Column<bool>(type: "bit", nullable: false),
                    JeSedmicni = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntervalZadatka", x => x.IntervalZadatkaId);
                });

            migrationBuilder.CreateTable(
                name: "VrstaZadatka",
                columns: table => new
                {
                    VrstaZadatkaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VrstaZadatka", x => x.VrstaZadatkaId);
                });

            migrationBuilder.CreateTable(
                name: "Zadatak",
                columns: table => new
                {
                    ZadatakId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    DatumPostavke = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZaposlenikPostavioId = table.Column<int>(type: "int", nullable: false),
                    ZaposlenikEditovaoId = table.Column<int>(type: "int", nullable: true),
                    IntervalZadatkaId = table.Column<int>(type: "int", nullable: false),
                    VrstaZadatkaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zadatak", x => x.ZadatakId);
                    table.ForeignKey(
                        name: "FK_Zadatak_IntervalZadatka_IntervalZadatkaId",
                        column: x => x.IntervalZadatkaId,
                        principalTable: "IntervalZadatka",
                        principalColumn: "IntervalZadatkaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Zadatak_VrstaZadatka_VrstaZadatkaId",
                        column: x => x.VrstaZadatkaId,
                        principalTable: "VrstaZadatka",
                        principalColumn: "VrstaZadatkaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Zadatak_Zaposlenik_ZaposlenikEditovaoId",
                        column: x => x.ZaposlenikEditovaoId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId");
                    table.ForeignKey(
                        name: "FK_Zadatak_Zaposlenik_ZaposlenikPostavioId",
                        column: x => x.ZaposlenikPostavioId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Zadatak_IntervalZadatkaId",
                table: "Zadatak",
                column: "IntervalZadatkaId");

            migrationBuilder.CreateIndex(
                name: "IX_Zadatak_VrstaZadatkaId",
                table: "Zadatak",
                column: "VrstaZadatkaId");

            migrationBuilder.CreateIndex(
                name: "IX_Zadatak_ZaposlenikEditovaoId",
                table: "Zadatak",
                column: "ZaposlenikEditovaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Zadatak_ZaposlenikPostavioId",
                table: "Zadatak",
                column: "ZaposlenikPostavioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Zadatak");

            migrationBuilder.DropTable(
                name: "IntervalZadatka");

            migrationBuilder.DropTable(
                name: "VrstaZadatka");
        }
    }
}
