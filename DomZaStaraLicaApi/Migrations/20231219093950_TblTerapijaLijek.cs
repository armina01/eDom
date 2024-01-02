using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class TblTerapijaLijek : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TerapijaLijek",
                columns: table => new
                {
                    TerapijaLijekId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TerapijaId = table.Column<int>(type: "int", nullable: false),
                    LijekId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TerapijaLijek", x => x.TerapijaLijekId);
                    table.ForeignKey(
                        name: "FK_TerapijaLijek_Lijek_LijekId",
                        column: x => x.LijekId,
                        principalTable: "Lijek",
                        principalColumn: "LijekId");
                    table.ForeignKey(
                        name: "FK_TerapijaLijek_Terapija_TerapijaId",
                        column: x => x.TerapijaId,
                        principalTable: "Terapija",
                        principalColumn: "TerapijaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TerapijaLijek_LijekId",
                table: "TerapijaLijek",
                column: "LijekId");

            migrationBuilder.CreateIndex(
                name: "IX_TerapijaLijek_TerapijaId",
                table: "TerapijaLijek",
                column: "TerapijaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TerapijaLijek");
        }
    }
}
