using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class PostavkaBaze : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Opstina",
                columns: table => new
                {
                    OpstinaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostanskiBroj = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Opstina", x => x.OpstinaID);
                });

            migrationBuilder.CreateTable(
                name: "KorisnikDoma",
                columns: table => new
                {
                    KorisnikDomaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImePrezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JMBG = table.Column<int>(type: "int", nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BrojSobe = table.Column<int>(type: "int", nullable: false),
                    OpstinaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnikDoma", x => x.KorisnikDomaID);
                    table.ForeignKey(
                        name: "FK_KorisnikDoma_Opstina_OpstinaID",
                        column: x => x.OpstinaID,
                        principalTable: "Opstina",
                        principalColumn: "OpstinaID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KorisnikDoma_OpstinaID",
                table: "KorisnikDoma",
                column: "OpstinaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KorisnikDoma");

            migrationBuilder.DropTable(
                name: "Opstina");
        }
    }
}
