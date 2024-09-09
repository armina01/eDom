import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {TerapijaDodajRequest} from "./terapijaDodajRequest";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MyConfig} from "../my-config";
import {TerapijaGetAllResponse, TerapijaGetAllResponseTerapija} from "./TerapijaGetAllResponse";
import {
    KorisnikDomaGetAllResponse,
    KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {DoktorGetAllResponse, DoktorGetAllResponseDoktor} from "../doktor/doktorGetAllResponse";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {LijekGetAllResponse, LijekGetAllResponseLijek} from "./lijekGetAllResponse";
import {LijekDodajRequest} from "./lijekDodajRequest";
import {Router} from "@angular/router";
import {TerapijaLijekGetAllResponse, TerapijaLijekGetAllResponseTerapijaLijek} from "./terapijaLijekGetAllResponse";
import {join} from "@angular/compiler-cli";
import {TerapijaLijekUpdateRequest} from "./terapijaLijekUpdateRequest";
import {KorisnikDomaService} from "../Services/KorisnikDomaService";
import {DoktorService} from "../Services/DoktorService";
import {TerapijaService} from "../Services/TerapijaService";
import {LijekService} from "../Services/LijekService";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertService} from "../Services/AlertService";



@Component({
  selector: 'app-terapija',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [KorisnikDomaService, DoktorService, TerapijaService, LijekService],
  templateUrl: './terapija.component.html',
  styleUrl: './terapija.component.css'
})
export class TerapijaComponent implements OnInit {
  public korisniciDoma: KorisnikDomaGetAllResponseKorisnik[] = [];
  public pretragaPoKorisniku: number = 0;
  doktori: DoktorGetAllResponseDoktor[] = [];
  public odabranaTerapija: TerapijaLijekUpdateRequest | null=null;
  lijekovi: LijekGetAllResponseLijek[] = [];
  public isKliknutoDugme: boolean = false;
  public Listalijekova: number [] = [];
  public odabraniNazivLijeka: string = "";
  public odabraniNazivLijekaDialog: string = "";
  terapijeLijekovi: TerapijaLijekGetAllResponseTerapijaLijek[] = []
  public filtriraniLijekovi: LijekGetAllResponseLijek[] = [];
  public odabraniLijekovi:LijekGetAllResponseLijek[] = [];
  public odabraniLijekoviDialog:LijekGetAllResponseLijek[] = [];
  public prikaziOdabaneLijekoveLabel:boolean=false;

  lijekForma: FormGroup;


  constructor(public httpClient: HttpClient, private dialog: MatDialog, public router: Router, private korisnikDomaService: KorisnikDomaService, private doktorService: DoktorService, private terapijaService: TerapijaService, private lijekService:LijekService, private fb: FormBuilder, private myAlert:AlertService, private formBuilder: FormBuilder) {
    this.lijekForma = this.formBuilder.group({
      naziv: ['', Validators.required],
      uputstvo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.GetAllKorisnike();
    this.GetAllTerapijeLijekovi();
    this.GetAllDoktore();
    this.GetAllLijekovi();
  }

  public terapijaRequest: TerapijaDodajRequest = {
    opis: "",
    nacinPrimjene: "",
    vremenskiInterval: "",
    doktorId: 0,
    korisnikDomaID: 0,
    lijekovi: this.Listalijekova,

  }
  public terapijaUpdateRequest:TerapijaLijekUpdateRequest= {
    terapijaId:0,
    opis: "",
    nacinPrimjene: "",
    vremenskiInterval: "",
    doktorId: 0,
    korisnikDomaID: 0,
    lijekovi: this.Listalijekova,

  }
  public lijekRequest: LijekDodajRequest = {
    naziv: "",
    uputstvo: ""
  }

  Dodaj(terapijaForm: NgForm): void {
    if (terapijaForm.valid) {
      this.terapijaRequest.lijekovi = this.Listalijekova;

      this.terapijaService.DodajTerapiju(this.terapijaRequest).subscribe(response => {
        this.myAlert.showSuccess('Terapija uspješno dodana');
      }, error => {
        this.myAlert.showError("Došlo je do greške prilikom dodavanja terapije");
      });
    } else {
      terapijaForm.control.markAllAsTouched();
    }
    setTimeout(() => {
      this.GetAllTerapijeLijekovi();
    }, 3000);
    this.Listalijekova=[];
  }

  GetAllLijekovi() {
    this.lijekService.GetAllLijekovi().subscribe(x => {
      this.lijekovi = x.lijekovi;
    })
  }

  GetAllDoktore() {
    this.doktorService.GetAllDoktori().subscribe(x=>{
      this.doktori=x.doktori;
    })
  }

  GetAllKorisnike() {
    this.korisnikDomaService.GetAllKorisnici().subscribe(x=>{
      this.korisniciDoma=x.korisnici;
    })
  }


  GetAllTerapijeLijekovi() {
    this.terapijaService.GetAllTerapije().subscribe(x => {
      this.terapijeLijekovi = x.terapijeLijekovi
    })
  }

  getFiltriraneTerapije() {
    return this.terapijeLijekovi
      .filter((terLijek, index, array) =>
        index === array.findIndex(t => t.terapija.terapijaId === terLijek.terapija.terapijaId
          && t.terapija.korisnikDomaID === this.pretragaPoKorisniku)
      )
      .map(terLijek => {
        const lijekovi: string = this.terapijeLijekovi
          .filter(t => t.terapija.terapijaId === terLijek.terapija.terapijaId
            && t.terapija.korisnikDomaID === this.pretragaPoKorisniku)
          .map(t => t.lijek.naziv)
          .join(', '); // Join drug names with commas

        return {
          terapijaLijek: terLijek,
          lijekovi: lijekovi
        };
      });

  }


  Obrisi(item: TerapijaGetAllResponseTerapija) {
    const dialogRef: MatDialogRef<WarningDialogComponent, boolean> = this.openWarningDialog('Da li ste sigurni da želite izbrisati terapiju?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.terapijaService.IzbrisiTerapiju(item).subscribe(
          response => () => {
            this.myAlert.showSuccess("Uspješno obrisana terapija")
            setTimeout(() => {
              this.GetAllTerapijeLijekovi();
              this.getFiltriraneTerapije();
            }, 3000);
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              this.myAlert.showError('Nije moguće izbrisati ovu terapiju');
            } else {
              // Handle other errors
              alert('An error occurred.');
            }
          })
        setTimeout(() => {
          this.GetAllTerapijeLijekovi();
        }, 3000);
      }
    });
  }

  openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
    return this.dialog.open(WarningDialogComponent, {
      data: {message},
    });
  };

  Odaberi(item: TerapijaLijekGetAllResponseTerapijaLijek) {

    this.odabranaTerapija = {
      terapijaId: item.terapija.terapijaId,
      opis: item.terapija.opis,
      nacinPrimjene: item.terapija.nacinPrimjene,
      vremenskiInterval: item.terapija.vremenskiInterval,
      doktorId: item.terapija.doktorId,
      korisnikDomaID: item.terapija.korisnikDomaID,
      lijekovi: this.Listalijekova

    };
  }

  getLijekoviZaTerapiju(terapijaId: number) {

    const filtriraneTerapije = this.getFiltriraneTerapije();

    const lijekoviZaTerapiju = filtriraneTerapije
      .filter(terapijaLijekObj => terapijaLijekObj.terapijaLijek.terapija.terapijaId === terapijaId)
      .map(terapijaLijekObj => terapijaLijekObj.lijekovi);

    return lijekoviZaTerapiju;
  }
  Update() {
    if(this.odabranaTerapija)
    {
      this.terapijaUpdateRequest={
        terapijaId:this.odabranaTerapija?.terapijaId,
        opis:this.odabranaTerapija.opis,
        nacinPrimjene:this.odabranaTerapija.nacinPrimjene,
        vremenskiInterval:this.odabranaTerapija.vremenskiInterval,
        korisnikDomaID:this.odabranaTerapija.korisnikDomaID,
        doktorId:this.odabranaTerapija.doktorId,
        lijekovi:this.Listalijekova
      }
    }
    this.terapijaService.UpdateTerapiju(this.terapijaUpdateRequest).subscribe(request => {
      this.myAlert.showSuccess("Terapija uspješno ažurirana ")
    })

    this.odabranaTerapija=null;
    this.Listalijekova=[];

    setTimeout(() => {
      this.GetAllTerapijeLijekovi();
    }, 3000);
  }

  DodajNoviLijek() {
    this.isKliknutoDugme = true;
  }

  DodajLijek() {
    if (this.lijekForma.valid) {
      this.lijekService.DodajLijek(this.lijekForma.value).subscribe(response => {
        this.myAlert.showSuccess("Lijek uspješno dodan");
      });

      setTimeout(() => {
        this.ngOnInit();  
      }, 3000);

      this.isKliknutoDugme = false;
    } else {

      this.isKliknutoDugme = true;
    }
  }


  PregledajLijekove() {
    this.router.navigate(["/lijek"])
  }


  DodajListuLijekova(lijek: LijekGetAllResponseLijek) {
    this.prikaziOdabaneLijekoveLabel=true;
    let lijekId = this.lijekovi.find(x => x.naziv===lijek.naziv)?.lijekId;
    if (lijekId != undefined)
      this.Listalijekova.push(lijekId);
    this.odabraniNazivLijeka="";
    this.odabraniNazivLijekaDialog="";


    if(this.odabranaTerapija) {
      this.odabraniLijekoviDialog = this.lijekovi.filter(lijek => this.Listalijekova.includes(lijek.lijekId));
    }
    else {
      this.odabraniLijekovi = this.lijekovi.filter(lijek => this.Listalijekova.includes(lijek.lijekId));
    }

  }

  pretraziLijekove() {
    if (this.odabraniNazivLijeka) {
      this.filtriraniLijekovi = this.lijekovi.filter(
        lijek => lijek.naziv.toLowerCase().includes(this.odabraniNazivLijeka.toLowerCase())
      );
    } else {
      this.filtriraniLijekovi = [];
    }

  }

  pretraziLijekoveDialog() {
    if (this.odabraniNazivLijekaDialog) {
      this.filtriraniLijekovi = this.lijekovi.filter(
        lijek => lijek.naziv.toLowerCase().includes(this.odabraniNazivLijekaDialog.toLowerCase())
      );
    } else {
      this.filtriraniLijekovi = [];
    }

  }

}
