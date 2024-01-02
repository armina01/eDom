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
import {TerapijaGetAllResponseTerapija} from "../terapija/TerapijaGetAllResponse";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";

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
    }
    constructor(public httpClient: HttpClient, private dialog: MatDialog) {
    }
    public korisniciDoma:KorisnikDomaGetAllResponseKorisnik[]=[];

    public terapijaRequest:FizioTerapijaRequest={
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


  Dodaj() {
    let url = MyConfig.adresa_servera + `/fizioTerapija/dodaj`;
    console.log(this.terapijaRequest);
    this.httpClient.post(url, this.terapijaRequest).subscribe(response => {
      console.log("Terapija uspjesno dodana");
    });
  }
  Obrisi(item: TerapijaGetAllResponseTerapija) {
    const dialogRef: MatDialogRef<WarningDialogComponent, boolean> = this.openWarningDialog('Da li ste sigurni da želite izbrisati terapiju?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/fizioTerapija/obrisi`;
        const params = new HttpParams().set('fizioTerapijaId', item.terapijaId);
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
}

