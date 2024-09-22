import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PoslovnaPozicijaRequest} from "./poslovnaPozicijaRequest";
import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GetAllPoslovnaPozicijaResponse, GetAllPoslovnaPozicijaResponsePoslovnaPozicija} from "./getAllPoslovnaPozicija";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {PoslovnaPozicijaService} from "../Services/PoslovnaPozicijaService";

@Component({
  selector: 'app-poslovna-pozicija',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers:[PoslovnaPozicijaService],
  templateUrl: './poslovna-pozicija.component.html',
  styleUrl: './poslovna-pozicija.component.css'
})
export class PoslovnaPozicijaComponent {
  constructor(public httpClient: HttpClient,private dialog: MatDialog,
              private poslovnaPozicijaService:PoslovnaPozicijaService) {
  }
  public poslovnaPozicijaRequest: PoslovnaPozicijaRequest={
    opisPosla:"",
    brojSati:0,
    nazivPozicije:""
  }
  DodajPoslovnuPoziciju() {
    this.poslovnaPozicijaService.DodajPoslovnuPoziciju(this.poslovnaPozicijaRequest).subscribe(request => {
      console.log("Korisnicki nalog dodan za ", request)
    })
  }
  poslovnaPozicija: GetAllPoslovnaPozicijaResponsePoslovnaPozicija[] = [];
  GetAllPoslovnaPozicija() {
    this.poslovnaPozicijaService.GetAllPoslovnaPozicija().subscribe(x => {
      this.poslovnaPozicija = x.poslovnePozicije
    })
  }
  getAllPoslovnePozicije(){
    return this.poslovnaPozicija;
  }

  ObrisiPoslovnuPoziciju(data:GetAllPoslovnaPozicijaResponsePoslovnaPozicija) {

    const dialogRef: MatDialogRef<WarningDialogComponent, boolean> = this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.poslovnaPozicijaService.IzbrisiPoslovnuPoziciju(data).subscribe(
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
            });
      }
    });
  }
     openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
        return this.dialog.open(WarningDialogComponent, {
          data: {message},
        });
      };
}
