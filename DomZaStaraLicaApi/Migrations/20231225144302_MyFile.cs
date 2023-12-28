using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class MyFile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MyFile",
                table: "MyFiles",
                newName: "MojFile");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MojFile",
                table: "MyFiles",
                newName: "MyFile");
        }
    }
}
