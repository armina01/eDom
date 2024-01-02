using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class tblTerapija : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Terapija",
                columns: table => new
                {
                    TerapijaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoktorId = table.Column<int>(type: "int", nullable: false),
                    LijekId = table.Column<int>(type: "int", nullable: true),
                    NacinPrimjene = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VremenskiInterval = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terapija", x => x.TerapijaId);
                    table.ForeignKey(
                        name: "FK_Terapija_Lijek_LijekId",
                        column: x => x.LijekId,
                        principalTable: "Lijek",
                        principalColumn: "LijekId");
                    table.ForeignKey(
                        name: "FK_Terapija_Zaposlenik_DoktorId",
                        column: x => x.DoktorId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Terapija_DoktorId",
                table: "Terapija",
                column: "DoktorId");

            migrationBuilder.CreateIndex(
                name: "IX_Terapija_LijekId",
                table: "Terapija",
                column: "LijekId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Terapija");
        }
    }
}
