import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KorisnickiNalogRequest} from "./korisnickiNalogRequest";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpParams} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "./getAllKorisnickiNalogResponse";
import {DeleteKorisnickiNalogRequest} from "./deleteKorisnickiNalogRequest";
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";
import {MyAuthInterceptor} from "../Helper/MyAuthInterceptor";
@Component({
  selector: 'app-korisnicki-nalog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers :[KorisnickiNalogService],
  templateUrl: './korisnicki-nalog.component.html',
  styleUrl: './korisnicki-nalog.component.css'
})
export class KorisnickiNalogComponent {
  constructor(public httpClient: HttpClient,private dialog: MatDialog,public korisnickiNalogService : KorisnickiNalogService) {
  }

  public korisnickiNalogRequest: KorisnickiNalogRequest = {
    korisnickoIme: "",
    lozinka: "",
    email:"sadzidadziho@gmail.com",
    jeAdmin: true,
    jeDoktor: false,
    jeFizioterapeut: false,
    jeNjegovatelj: false,
    jeNutricionista: false,
    je2FActive:true,
  }
  korisnickiNalog: GetAllKorisnickiNalogResponseKorisnickiNalog[] = [];

  AddKorisnickiNalog(): void {
    console.log(this.korisnickiNalogRequest);
    this.korisnickiNalogService.DodajKorisnickiNalog( this.korisnickiNalogRequest).subscribe(request => {
      console.log("Korisnicki nalog dodan za ", request)
    })
  }

  GetAllKorisnickiNalog(): void {
    this.korisnickiNalogService.GetAllKorisnickiNalog().subscribe(x => {
      console.log(x.korisnickiNalozi)
      this.korisnickiNalog = x.korisnickiNalozi
    })
  }

  getFiltriraniKorisnickiNalog() {
    return this.korisnickiNalog;
  }

  ObrisiKorisnickiNalog(data: GetAllKorisnickiNalogResponseKorisnickiNalog) {
    var deleteNalog: DeleteKorisnickiNalogRequest = {
      KorisnikId: data.nalogId
    }
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.korisnickiNalogService.ObrisiKorisnickiNalog(data).subscribe(
            response => () => {
              console.log("Deleted item")
            },
            (error: any) => {
              console.error('Error:', error);

              if (error.status === 500) {
                alert('Nije moguće izbrisati ovaj korisnički nalog');
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
