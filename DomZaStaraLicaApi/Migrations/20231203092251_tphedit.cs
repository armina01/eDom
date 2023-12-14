using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class tphedit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Doktor");

            migrationBuilder.DropTable(
                name: "Fizioterapeut");

            migrationBuilder.DropTable(
                name: "Nutricionista");

            migrationBuilder.DropTable(
                name: "Njegovatelj");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NazivKlinike",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutricionistickiCentar",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OblastFizijatrije",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OblastMedicine",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OblastNutricionizma",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Specijalizacija",
                table: "Zaposlenik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "brojPacijenata",
                table: "Zaposlenik",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isMedicinskiTehnicar",
                table: "Zaposlenik",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isNjegovatelj",
                table: "Zaposlenik",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "NazivKlinike",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "NutricionistickiCentar",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "OblastFizijatrije",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "OblastMedicine",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "OblastNutricionizma",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "Specijalizacija",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "brojPacijenata",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "isMedicinskiTehnicar",
                table: "Zaposlenik");

            migrationBuilder.DropColumn(
                name: "isNjegovatelj",
                table: "Zaposlenik");

            migrationBuilder.CreateTable(
                name: "Doktor",
                columns: table => new
                {
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    DoktorId = table.Column<int>(type: "int", nullable: false),
                    NazivKlinike = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OblastMedicine = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specijalizacija = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doktor", x => x.ZaposlenikId);
                    table.ForeignKey(
                        name: "FK_Doktor_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Fizioterapeut",
                columns: table => new
                {
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    FizioterapeutId = table.Column<int>(type: "int", nullable: false),
                    OblastFizijatrije = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fizioterapeut", x => x.ZaposlenikId);
                    table.ForeignKey(
                        name: "FK_Fizioterapeut_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Nutricionista",
                columns: table => new
                {
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    NutricionistaId = table.Column<int>(type: "int", nullable: false),
                    NutricionistickiCentar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OblastNutricionizma = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nutricionista", x => x.ZaposlenikId);
                    table.ForeignKey(
                        name: "FK_Nutricionista_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Njegovatelj",
                columns: table => new
                {
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    NjegovateljId = table.Column<int>(type: "int", nullable: false),
                    brojPacijenata = table.Column<int>(type: "int", nullable: false),
                    isMedicinskiTehnicar = table.Column<bool>(type: "bit", nullable: false),
                    isNjegovatelj = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Njegovatelj", x => x.ZaposlenikId);
                    table.ForeignKey(
                        name: "FK_Njegovatelj_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
