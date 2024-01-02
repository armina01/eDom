import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FizioTerapijaRequest} from "./fizioTerapijaRequest";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {MyConfig} from "../my-config";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {
  FizioterapeutGetAllResponse,
  FizioterapeutGetAllResponseFizioterapeut
} from "../fizioterapeut/fizioterapeutGetAll";
import {FizioTerapijaGetAllResponse, FizioTerapijaGetAllResponseFizioTerapija} from "./fizioTerapijaGetAllResponse";

@Component({
  selector: 'app-fizio-terapija',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './fizio-terapija.component.html',
  styleUrl: './fizio-terapija.component.css'
})
export class FizioTerapijaComponent implements OnInit{
    ngOnInit(): void {
       this.GetAllKorisnike();
       this.GetAllFizioTerapije();
       this.getFizioterapeut();
       this.GetAllFizioterapeuti();
    }
    constructor(public httpClient: HttpClient, private dialog: MatDialog) {
    }
    public korisniciDoma:KorisnikDomaGetAllResponseKorisnik[]=[];
    public pretragaPoKorisniku: number = 0;
    public allFizioterapeuti: FizioterapeutGetAllResponseFizioterapeut[] = [];
    public allTerapije:FizioTerapijaGetAllResponseFizioTerapija[]=[];
    public odabranaTerapija:FizioTerapijaGetAllResponseFizioTerapija | null=null;



    public terapijaRequest:FizioTerapijaRequest={
      opis:"",
      datumPostavke:new Date(),
      korisnikDomaID:0,
      zaposlenikId:this.getFizioterapeut()?.zaposlenikId??0


    }
  public terapijaUpdateRequest:FizioTerapijaGetAllResponseFizioTerapija={
      fizioTerapijaId:0,
    opis:"",
    datumPostavke:new Date(),
    korisnikDomaID:0,
    zaposlenikId:0

  }
  GetAllKorisnike() {
    let url = MyConfig.adresa_servera + `/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x: KorisnikDomaGetAllResponse) => {
      this.korisniciDoma = x.korisnici;
    })
  }
  GetAllFizioterapeuti() {
    let url: string = MyConfig.adresa_servera + `/fizioterapeut-getAll`;
    this.httpClient.get<FizioterapeutGetAllResponse>(url).subscribe(x => {
      this.allFizioterapeuti= x.fizioterapeuti
    })
  }

  Dodaj() {
    let url = MyConfig.adresa_servera + `/fizioTerapija/dodaj`;
    console.log(this.terapijaRequest);
    this.httpClient.post(url, this.terapijaRequest).subscribe(response => {
      console.log("Terapija uspjesno dodana");
    });
  }
  Obrisi(item: FizioTerapijaGetAllResponseFizioTerapija) {
    const dialogRef: MatDialogRef<WarningDialogComponent, boolean> = this.openWarningDialog('Da li ste sigurni da želite izbrisati terapiju?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/fizioTerapija/obrisi`;
        const params = new HttpParams().set('fizioTerapijaId', item.fizioTerapijaId);
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

  GetAllFizioTerapije() {
    let url: string = MyConfig.adresa_servera + `/fizioTerapija/getAll`;
    this.httpClient.get<FizioTerapijaGetAllResponse>(url).subscribe(x => {
      this.allTerapije = x.fizioTerapije
    })
  }
  getFiltriraneTerapije() {
     return this.allTerapije.filter(x=>x.korisnikDomaID===this.pretragaPoKorisniku);
  }

  Odaberi(item: FizioTerapijaGetAllResponseFizioTerapija) {
    this.odabranaTerapija = {
      fizioTerapijaId:item.fizioTerapijaId,
      opis:item.opis,
      datumPostavke:item.datumPostavke,
      zaposlenikId:item.zaposlenikId,
      korisnikDomaID:item.korisnikDomaID
    };
  }

  Update() {
    if(this.odabranaTerapija)
    {
      this.terapijaUpdateRequest={
        fizioTerapijaId:this.odabranaTerapija.fizioTerapijaId,
        opis:this.odabranaTerapija.opis,
        datumPostavke:this.odabranaTerapija.datumPostavke,
        zaposlenikId:this.odabranaTerapija.zaposlenikId,
        korisnikDomaID:this.odabranaTerapija.korisnikDomaID
      }
    }

    let url: string = MyConfig.adresa_servera + `/fizioTerapija/update`;
    console.log(this.terapijaUpdateRequest)
    this.httpClient.post(url, this.terapijaUpdateRequest).subscribe(request => {
      console.log("Terapija updateovana ", request)
    })

    this.odabranaTerapija=null;

    setTimeout(() => {
      this.ngOnInit();
    }, 5000);
  }


  getFizioterapeut():FizioterapeutGetAllResponseFizioterapeut | null {
    let korisnik = window.localStorage.getItem("korisnik")??"";
    try {
      return JSON.parse(korisnik);
    }
    catch (e){
      return null;
    }
  }
}

