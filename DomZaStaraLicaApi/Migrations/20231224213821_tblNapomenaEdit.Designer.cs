﻿// <auto-generated />
using System;
using DomZaStaraLicaApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DomZaStaraLicaApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231224213821_tblNapomenaEdit")]
    partial class tblNapomenaEdit
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.AuthToken", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("KorisnickiNalogId")
                        .HasColumnType("int");

                    b.Property<string>("ipAdresa")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vrijednost")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("vrijemeEvidentiranja")
                        .HasColumnType("datetime2");

                    b.HasKey("id");

                    b.HasIndex("KorisnickiNalogId");

                    b.ToTable("AuthToken");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.CLijek", b =>
                {
                    b.Property<int>("LijekId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LijekId"));

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Uputstvo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LijekId");

                    b.ToTable("Lijek");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Dijagnoza", b =>
                {
                    b.Property<int>("dijagnozaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("dijagnozaId"));

                    b.Property<int>("KorisnikDomaID")
                        .HasColumnType("int");

                    b.Property<int>("ZaposlenikId")
                        .HasColumnType("int");

                    b.Property<DateTime>("datumDijagnoze")
                        .HasColumnType("datetime2");

                    b.Property<string>("nazivBolesti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("dijagnozaId");

                    b.HasIndex("KorisnikDomaID");

                    b.HasIndex("ZaposlenikId");

                    b.ToTable("Dijagnoza");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.KorisnickiNalog", b =>
                {
                    b.Property<int>("NalogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NalogId"));

                    b.Property<bool>("JeAdmin")
                        .HasColumnType("bit");

                    b.Property<bool>("JeDoktor")
                        .HasColumnType("bit");

                    b.Property<bool>("JeFizioterapeut")
                        .HasColumnType("bit");

                    b.Property<bool>("JeNjegovatelj")
                        .HasColumnType("bit");

                    b.Property<bool>("JeNutricionista")
                        .HasColumnType("bit");

                    b.Property<string>("KorisnickoIme")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lozinka")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NalogId");

                    b.ToTable("KorisnickiNalog");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.KorisnikDoma", b =>
                {
                    b.Property<int>("KorisnikDomaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KorisnikDomaID"));

                    b.Property<int>("BrojSobe")
                        .HasColumnType("int");

                    b.Property<DateTime>("DatumRodjenja")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImePrezime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JMBG")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OpstinaID")
                        .HasColumnType("int");

                    b.HasKey("KorisnikDomaID");

                    b.HasIndex("OpstinaID");

                    b.ToTable("KorisnikDoma");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Napomena", b =>
                {
                    b.Property<int>("NapomenaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NapomenaId"));

                    b.Property<DateTime>("DatumPostavke")
                        .HasColumnType("datetime2");

                    b.Property<int>("KorisnikDomaID")
                        .HasColumnType("int");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Prioritet")
                        .HasColumnType("bit");

                    b.Property<int>("VrstaNapomeneId")
                        .HasColumnType("int");

                    b.Property<int>("ZaposlenikId")
                        .HasColumnType("int");

                    b.HasKey("NapomenaId");

                    b.HasIndex("KorisnikDomaID");

                    b.HasIndex("VrstaNapomeneId");

                    b.HasIndex("ZaposlenikId");

                    b.ToTable("Napomena");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Opstina", b =>
                {
                    b.Property<int>("OpstinaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OpstinaID"));

                    b.Property<string>("NazivOpstine")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PostanskiBroj")
                        .HasColumnType("int");

                    b.HasKey("OpstinaID");

                    b.ToTable("Opstina");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.PoslovnaPozicija", b =>
                {
                    b.Property<int>("PoslovnaPozicijaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PoslovnaPozicijaId"));

                    b.Property<int>("BrojSati")
                        .HasColumnType("int");

                    b.Property<string>("NazivPozicije")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OpisPosla")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PoslovnaPozicijaId");

                    b.ToTable("PoslovnaPozicija");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Terapija", b =>
                {
                    b.Property<int>("TerapijaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TerapijaId"));

                    b.Property<int>("DoktorId")
                        .HasColumnType("int");

                    b.Property<int>("KorisnikDomaID")
                        .HasColumnType("int");

                    b.Property<string>("NacinPrimjene")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VremenskiInterval")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TerapijaId");

                    b.HasIndex("DoktorId");

                    b.HasIndex("KorisnikDomaID");

                    b.ToTable("Terapija");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.TerapijaLijek", b =>
                {
                    b.Property<int>("TerapijaLijekId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TerapijaLijekId"));

                    b.Property<int?>("LijekId")
                        .HasColumnType("int");

                    b.Property<int>("TerapijaId")
                        .HasColumnType("int");

                    b.HasKey("TerapijaLijekId");

                    b.HasIndex("LijekId");

                    b.HasIndex("TerapijaId");

                    b.ToTable("TerapijaLijek");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.VrstaNapomene", b =>
                {
                    b.Property<int>("VrstaNapomeneId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("VrstaNapomeneId"));

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("VrstaNapomeneId");

                    b.ToTable("VrstaNapomene");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Zaposlenik", b =>
                {
                    b.Property<int>("ZaposlenikId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ZaposlenikId"));

                    b.Property<DateTime>("DatumRodjenja")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DatumZaposlenja")
                        .HasColumnType("datetime2");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImePrezime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JMBG")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("NalogId")
                        .HasColumnType("int");

                    b.Property<int>("PoslovnaPozicijaId")
                        .HasColumnType("int");

                    b.HasKey("ZaposlenikId");

                    b.HasIndex("NalogId");

                    b.HasIndex("PoslovnaPozicijaId");

                    b.ToTable("Zaposlenik");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Zaposlenik");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Doktor", b =>
                {
                    b.HasBaseType("DomZaStaraLicaApi.Data.Models.Zaposlenik");

                    b.Property<string>("NazivKlinike")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OblastMedicine")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Specijalizacija")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Doktor");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Fizioterapeut", b =>
                {
                    b.HasBaseType("DomZaStaraLicaApi.Data.Models.Zaposlenik");

                    b.Property<string>("OblastFizijatrije")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Fizioterapeut");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Njegovatelj", b =>
                {
                    b.HasBaseType("DomZaStaraLicaApi.Data.Models.Zaposlenik");

                    b.Property<int>("brojPacijenata")
                        .HasColumnType("int");

                    b.Property<bool>("isMedicinskiTehnicar")
                        .HasColumnType("bit");

                    b.Property<bool>("isNjegovatelj")
                        .HasColumnType("bit");

                    b.HasDiscriminator().HasValue("Njegovatelj");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Nutricionista", b =>
                {
                    b.HasBaseType("DomZaStaraLicaApi.Data.Models.Zaposlenik");

                    b.Property<string>("NutricionistickiCentar")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OblastNutricionizma")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Nutricionista");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.AuthToken", b =>
                {
                    b.HasOne("DomZaStaraLicaApi.Data.Models.KorisnickiNalog", "korisnickiNalog")
                        .WithMany()
                        .HasForeignKey("KorisnickiNalogId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("korisnickiNalog");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Dijagnoza", b =>
                {
                    b.HasOne("DomZaStaraLicaApi.Data.Models.KorisnikDoma", "KorisnikDoma")
                        .WithMany()
                        .HasForeignKey("KorisnikDomaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomZaStaraLicaApi.Data.Models.Zaposlenik", "Zaposlenik")
                        .WithMany()
                        .HasForeignKey("ZaposlenikId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("KorisnikDoma");

                    b.Navigation("Zaposlenik");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.KorisnikDoma", b =>
                {
                    b.HasOne("DomZaStaraLicaApi.Data.Models.Opstina", "Opstina")
                        .WithMany()
                        .HasForeignKey("OpstinaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Opstina");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Napomena", b =>
                {
                    b.HasOne("DomZaStaraLicaApi.Data.Models.KorisnikDoma", "KorisnikDoma")
                        .WithMany()
                        .HasForeignKey("KorisnikDomaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomZaStaraLicaApi.Data.Models.VrstaNapomene", "VrstaNapomene")
                        .WithMany()
                        .HasForeignKey("VrstaNapomeneId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomZaStaraLicaApi.Data.Models.Zaposlenik", "Zaposlenik")
                        .WithMany()
                        .HasForeignKey("ZaposlenikId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("KorisnikDoma");

                    b.Navigation("VrstaNapomene");

                    b.Navigation("Zaposlenik");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Terapija", b =>
                {
                    b.HasOne("DomZaStaraLicaApi.Data.Models.Doktor", "Doktor")
                        .WithMany()
                        .HasForeignKey("DoktorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DomZaStaraLicaApi.Data.Models.KorisnikDoma", "KorisnikDoma")
                        .WithMany()
                        .HasForeignKey("KorisnikDomaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Doktor");

                    b.Navigation("KorisnikDoma");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.TerapijaLijek", b =>
                {
                    b.HasOne("DomZaStaraLicaApi.Data.Models.CLijek", "Lijek")
                        .WithMany("TerapijaLijekovi")
                        .HasForeignKey("LijekId");

                    b.HasOne("DomZaStaraLicaApi.Data.Models.Terapija", "Terapija")
                        .WithMany("TerapijaLijekovi")
                        .HasForeignKey("TerapijaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lijek");

                    b.Navigation("Terapija");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Zaposlenik", b =>
                {
                    b.HasOne("DomZaStaraLicaApi.Data.Models.KorisnickiNalog", "KorisnickiNalog")
                        .WithMany()
                        .HasForeignKey("NalogId");

                    b.HasOne("DomZaStaraLicaApi.Data.Models.PoslovnaPozicija", "PoslovnaPozicija")
                        .WithMany()
                        .HasForeignKey("PoslovnaPozicijaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("KorisnickiNalog");

                    b.Navigation("PoslovnaPozicija");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.CLijek", b =>
                {
                    b.Navigation("TerapijaLijekovi");
                });

            modelBuilder.Entity("DomZaStaraLicaApi.Data.Models.Terapija", b =>
                {
                    b.Navigation("TerapijaLijekovi");
                });
#pragma warning restore 612, 618
        }
    }
}
