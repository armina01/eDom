using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class DodanPlanIshrane : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlanIshrane",
                columns: table => new
                {
                    PlanIshraneId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    File = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    NutricionistaId = table.Column<int>(type: "int", nullable: false),
                    KorisnikDomaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanIshrane", x => x.PlanIshraneId);
                    table.ForeignKey(
                        name: "FK_PlanIshrane_KorisnikDoma_KorisnikDomaId",
                        column: x => x.KorisnikDomaId,
                        principalTable: "KorisnikDoma",
                        principalColumn: "KorisnikDomaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlanIshrane_Zaposlenik_NutricionistaId",
                        column: x => x.NutricionistaId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlanIshrane_KorisnikDomaId",
                table: "PlanIshrane",
                column: "KorisnikDomaId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanIshrane_NutricionistaId",
                table: "PlanIshrane",
                column: "NutricionistaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlanIshrane");
        }
    }
}
