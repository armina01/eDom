using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class DodatFile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyFiles",
                table: "PlanIshrane");

            migrationBuilder.AddColumn<int>(
                name: "FileId",
                table: "PlanIshrane",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MyFiles",
                columns: table => new
                {
                    FileId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MyFile = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_File", x => x.FileId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlanIshrane_FileId",
                table: "PlanIshrane",
                column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanIshrane_File_FileId",
                table: "PlanIshrane",
                column: "FileId",
                principalTable: "MyFiles",
                principalColumn: "FileId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanIshrane_File_FileId",
                table: "PlanIshrane");

            migrationBuilder.DropTable(
                name: "MyFiles");

            migrationBuilder.DropIndex(
                name: "IX_PlanIshrane_FileId",
                table: "PlanIshrane");

            migrationBuilder.DropColumn(
                name: "FileId",
                table: "PlanIshrane");

            migrationBuilder.AddColumn<byte[]>(
                name: "MyFiles",
                table: "PlanIshrane",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
