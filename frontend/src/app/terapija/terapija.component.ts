import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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



@Component({
  selector: 'app-terapija',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
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


  constructor(public httpClient: HttpClient, private dialog: MatDialog, public router: Router) {

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

  Dodaj() {

    let url = MyConfig.adresa_servera + `/terapijaLijek/dodaj`;
    console.log(this.terapijaRequest);
    this.httpClient.post(url, this.terapijaRequest).subscribe(response => {
      console.log("Terapija uspjesno dodana");
    });

  }

  GetAllLijekovi() {
    let url: string = MyConfig.adresa_servera + `/lijek/getAll`;
    this.httpClient.get<LijekGetAllResponse>(url).subscribe(x => {
      this.lijekovi = x.lijekovi;
    })
  }

  GetAllDoktore() {
    let url: string = MyConfig.adresa_servera + `/doktor-getAll`;
    this.httpClient.get<DoktorGetAllResponse>(url).subscribe(x => {
      this.doktori = x.doktori;
    })
  }

  GetAllKorisnike() {
    let url = MyConfig.adresa_servera + `/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x: KorisnikDomaGetAllResponse) => {
      this.korisniciDoma = x.korisnici;
    })
  }


  GetAllTerapijeLijekovi() {
    let url: string = MyConfig.adresa_servera + `/terapijaLijek/getAll`;
    this.httpClient.get<TerapijaLijekGetAllResponse>(url).subscribe(x => {
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
        let url: string = MyConfig.adresa_servera + `/terapijaLijek/obrisi`;
        const params = new HttpParams().set('terapijaId', item.terapijaId);
        this.httpClient.delete(url, {params}).subscribe(
          response => () => {
            console.log("Deleted item")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati ovu terapiju');
              console.error('Handle 500 error here');
            } else {
              // Handle other errors
              alert('An error occurred.');
            }
          })
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
      lijekovi:this.Listalijekova

    };
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

    let url: string = MyConfig.adresa_servera + `/terapijaLijek/update`;
    console.log(this.terapijaUpdateRequest)
    this.httpClient.post(url, this.terapijaUpdateRequest).subscribe(request => {
      console.log("Terapija updateovana ", request)
    })

    this.odabranaTerapija=null;
    setTimeout(() => {
      this.ngOnInit();
    }, 5000);
  }

  DodajNoviLijek() {
    this.isKliknutoDugme = true;
  }

  DodajLijek() {
    let url = MyConfig.adresa_servera + `/lijek/dodaj`;
    console.log(this.lijekRequest);
    this.httpClient.post(url, this.lijekRequest).subscribe(response => {
      console.log("Lijek uspjesno dodan");
    });

    setTimeout(() => {
      this.ngOnInit();
    }, 5000); // 5000 milisekundi = 5 sekundi

    this.isKliknutoDugme = false;

  }

  PregledajLijekove() {
    this.router.navigate(["/lijek"])
  }


  DodajListuLijekova(lijek: LijekGetAllResponseLijek) {

    let lijekId = this.lijekovi.find(x => x.naziv===lijek.naziv)?.lijekId;
    if (lijekId != undefined)
      this.Listalijekova.push(lijekId);
    console.log(this.Listalijekova);
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
