using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    /// <inheritdoc />
    public partial class korisnikUpd : Migration
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
                name: "KorisnickiNalog",
                columns: table => new
                {
                    NalogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Lozinka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JeAdmin = table.Column<bool>(type: "bit", nullable: false),
                    JeNjegovatelj = table.Column<bool>(type: "bit", nullable: false),
                    JeFizioterapeut = table.Column<bool>(type: "bit", nullable: false),
                    JeNutricionista = table.Column<bool>(type: "bit", nullable: false),
                    JeDoktor = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KorisnickiNalog", x => x.NalogId);
                });

            migrationBuilder.CreateTable(
                name: "Lijek",
                columns: table => new
                {
                    LijekId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Uputstvo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lijek", x => x.LijekId);
                });

            migrationBuilder.CreateTable(
                name: "Opstina",
                columns: table => new
                {
                    OpstinaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivOpstine = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostanskiBroj = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Opstina", x => x.OpstinaID);
                });

            migrationBuilder.CreateTable(
                name: "PoslovnaPozicija",
                columns: table => new
                {
                    PoslovnaPozicijaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OpisPosla = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojSati = table.Column<int>(type: "int", nullable: false),
                    NazivPozicije = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoslovnaPozicija", x => x.PoslovnaPozicijaId);
                });

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
                name: "AuthToken",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vrijednost = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnickiNalogId = table.Column<int>(type: "int", nullable: false),
                    vrijemeEvidentiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ipAdresa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthToken", x => x.id);
                    table.ForeignKey(
                        name: "FK_AuthToken_KorisnickiNalog_KorisnickiNalogId",
                        column: x => x.KorisnickiNalogId,
                        principalTable: "KorisnickiNalog",
                        principalColumn: "NalogId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KorisnikDoma",
                columns: table => new
                {
                    KorisnikDomaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImePrezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JMBG = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BrojSobe = table.Column<int>(type: "int", nullable: false),
                    OpstinaID = table.Column<int>(type: "int", nullable: false),
                    SlikaKorisnika = table.Column<string>(type: "nvarchar(max)", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Zaposlenik",
                columns: table => new
                {
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImePrezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JMBG = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumZaposlenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NalogId = table.Column<int>(type: "int", nullable: true),
                    PoslovnaPozicijaId = table.Column<int>(type: "int", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NazivKlinike = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OblastMedicine = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Specijalizacija = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OblastFizijatrije = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    brojPacijenata = table.Column<int>(type: "int", nullable: true),
                    isMedicinskiTehnicar = table.Column<bool>(type: "bit", nullable: true),
                    isNjegovatelj = table.Column<bool>(type: "bit", nullable: true),
                    NutricionistickiCentar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OblastNutricionizma = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zaposlenik", x => x.ZaposlenikId);
                    table.ForeignKey(
                        name: "FK_Zaposlenik_KorisnickiNalog_NalogId",
                        column: x => x.NalogId,
                        principalTable: "KorisnickiNalog",
                        principalColumn: "NalogId");
                    table.ForeignKey(
                        name: "FK_Zaposlenik_PoslovnaPozicija_PoslovnaPozicijaId",
                        column: x => x.PoslovnaPozicijaId,
                        principalTable: "PoslovnaPozicija",
                        principalColumn: "PoslovnaPozicijaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dijagnoza",
                columns: table => new
                {
                    dijagnozaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nazivBolesti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datumDijagnoze = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    KorisnikDomaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dijagnoza", x => x.dijagnozaId);
                    table.ForeignKey(
                        name: "FK_Dijagnoza_KorisnikDoma_KorisnikDomaID",
                        column: x => x.KorisnikDomaID,
                        principalTable: "KorisnikDoma",
                        principalColumn: "KorisnikDomaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dijagnoza_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FizioTerapija",
                columns: table => new
                {
                    FizioTerapijaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatumPostavke = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZaposlenikId = table.Column<int>(type: "int", nullable: false),
                    KorisnikDomaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FizioTerapija", x => x.FizioTerapijaId);
                    table.ForeignKey(
                        name: "FK_FizioTerapija_KorisnikDoma_KorisnikDomaID",
                        column: x => x.KorisnikDomaID,
                        principalTable: "KorisnikDoma",
                        principalColumn: "KorisnikDomaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FizioTerapija_Zaposlenik_ZaposlenikId",
                        column: x => x.ZaposlenikId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Napomena",
                columns: table => new
                {
                    NapomenaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prioritet = table.Column<bool>(type: "bit", nullable: false),
                    isAktivna = table.Column<bool>(type: "bit", nullable: false),
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

            migrationBuilder.CreateTable(
                name: "Terapija",
                columns: table => new
                {
                    TerapijaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoktorId = table.Column<int>(type: "int", nullable: false),
                    KorisnikDomaID = table.Column<int>(type: "int", nullable: false),
                    NacinPrimjene = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VremenskiInterval = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Terapija", x => x.TerapijaId);
                    table.ForeignKey(
                        name: "FK_Terapija_KorisnikDoma_KorisnikDomaID",
                        column: x => x.KorisnikDomaID,
                        principalTable: "KorisnikDoma",
                        principalColumn: "KorisnikDomaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Terapija_Zaposlenik_DoktorId",
                        column: x => x.DoktorId,
                        principalTable: "Zaposlenik",
                        principalColumn: "ZaposlenikId",
                        onDelete: ReferentialAction.Cascade);
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
                    VrstaZadatkaId = table.Column<int>(type: "int", nullable: false),
                    KorisnikDomaId = table.Column<int>(type: "int", nullable: false)
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
                        name: "FK_Zadatak_KorisnikDoma_KorisnikDomaId",
                        column: x => x.KorisnikDomaId,
                        principalTable: "KorisnikDoma",
                        principalColumn: "KorisnikDomaID",
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
                name: "IX_AuthToken_KorisnickiNalogId",
                table: "AuthToken",
                column: "KorisnickiNalogId");

            migrationBuilder.CreateIndex(
                name: "IX_Dijagnoza_KorisnikDomaID",
                table: "Dijagnoza",
                column: "KorisnikDomaID");

            migrationBuilder.CreateIndex(
                name: "IX_Dijagnoza_ZaposlenikId",
                table: "Dijagnoza",
                column: "ZaposlenikId");

            migrationBuilder.CreateIndex(
                name: "IX_FizioTerapija_KorisnikDomaID",
                table: "FizioTerapija",
                column: "KorisnikDomaID");

            migrationBuilder.CreateIndex(
                name: "IX_FizioTerapija_ZaposlenikId",
                table: "FizioTerapija",
                column: "ZaposlenikId");

            migrationBuilder.CreateIndex(
                name: "IX_KorisnickiNalog_KorisnickoIme",
                table: "KorisnickiNalog",
                column: "KorisnickoIme",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KorisnikDoma_OpstinaID",
                table: "KorisnikDoma",
                column: "OpstinaID");

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

            migrationBuilder.CreateIndex(
                name: "IX_Terapija_DoktorId",
                table: "Terapija",
                column: "DoktorId");

            migrationBuilder.CreateIndex(
                name: "IX_Terapija_KorisnikDomaID",
                table: "Terapija",
                column: "KorisnikDomaID");

            migrationBuilder.CreateIndex(
                name: "IX_TerapijaLijek_LijekId",
                table: "TerapijaLijek",
                column: "LijekId");

            migrationBuilder.CreateIndex(
                name: "IX_TerapijaLijek_TerapijaId",
                table: "TerapijaLijek",
                column: "TerapijaId");

            migrationBuilder.CreateIndex(
                name: "IX_Zadatak_IntervalZadatkaId",
                table: "Zadatak",
                column: "IntervalZadatkaId");

            migrationBuilder.CreateIndex(
                name: "IX_Zadatak_KorisnikDomaId",
                table: "Zadatak",
                column: "KorisnikDomaId");

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

            migrationBuilder.CreateIndex(
                name: "IX_Zaposlenik_NalogId",
                table: "Zaposlenik",
                column: "NalogId");

            migrationBuilder.CreateIndex(
                name: "IX_Zaposlenik_PoslovnaPozicijaId",
                table: "Zaposlenik",
                column: "PoslovnaPozicijaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthToken");

            migrationBuilder.DropTable(
                name: "Dijagnoza");

            migrationBuilder.DropTable(
                name: "FizioTerapija");

            migrationBuilder.DropTable(
                name: "Napomena");

            migrationBuilder.DropTable(
                name: "TerapijaLijek");

            migrationBuilder.DropTable(
                name: "Zadatak");

            migrationBuilder.DropTable(
                name: "VrstaNapomene");

            migrationBuilder.DropTable(
                name: "Lijek");

            migrationBuilder.DropTable(
                name: "Terapija");

            migrationBuilder.DropTable(
                name: "IntervalZadatka");

            migrationBuilder.DropTable(
                name: "VrstaZadatka");

            migrationBuilder.DropTable(
                name: "KorisnikDoma");

            migrationBuilder.DropTable(
                name: "Zaposlenik");

            migrationBuilder.DropTable(
                name: "Opstina");

            migrationBuilder.DropTable(
                name: "KorisnickiNalog");

            migrationBuilder.DropTable(
                name: "PoslovnaPozicija");
        }
    }
}
