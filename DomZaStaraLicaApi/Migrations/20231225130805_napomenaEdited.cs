using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class napomenaEdited : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatumIsteka",
                table: "Napomena");

            migrationBuilder.AddColumn<bool>(
                name: "isAktivna",
                table: "Napomena",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAktivna",
                table: "Napomena");

            migrationBuilder.AddColumn<DateTime>(
                name: "DatumIsteka",
                table: "Napomena",
                type: "datetime2",
                nullable: true);
        }
    }
}
