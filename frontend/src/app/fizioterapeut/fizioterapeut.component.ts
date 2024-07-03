import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {map, Observable} from "rxjs";
import {MyConfig} from "../my-config";
import {FizioterapeutDodajRequest} from "./fizioterapeutDodajRequest";
import {
  FizioterapeutGetAllResponseFizioterapeut, FizioterapeutGetAllResponse,
} from "./fizioterapeutGetAll";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {FizioterapeutUpdateRequest} from "./fizioterapeutUpdateRequest";
import {FizioterapeutService} from "../Services/FizioterapeutService";



@Component({
  selector: 'app-fizioterapeut',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [FizioterapeutService],
  templateUrl: './fizioterapeut.component.html',
  styleUrl: './fizioterapeut.component.css'
})
export class FizioterapeutComponent implements OnInit {

  public poslovnePozicije: GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]=[];
  public allFizioterapeuti: FizioterapeutGetAllResponseFizioterapeut[]=[];

  constructor(public httpClient: HttpClient,private dialog: MatDialog, private fizioterapeutService: FizioterapeutService) {

  }

  ngOnInit(): void {
    this.GetAllPoslovnaPozicija().subscribe((data)=>{
      this.poslovnePozicije=data;
    })
  }

  public fizioterapeutRequest: FizioterapeutDodajRequest={
    imePrezime: "",
    jmbg: "",
    datumRodjenja: "",
    datumZaposlenja: "",
    nalogId:  null,
    poslovnaPozicijaId: 0,
    oblastFizijatrije: ""
  }
    public fizioterapeutUpdateRequest: FizioterapeutUpdateRequest={
        zaposlenikId:0,
        imePrezime: "",
        jmbg: "",
        datumRodjenja: "",
        datumZaposlenja: "",
        nalogId:  null,
        poslovnaPozicijaId: 0,
        oblastFizijatrije: ""
    }

  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).pipe(
      map((response)=>response.poslovnePozicije)
    )
  }


  Dodaj() {
    this.fizioterapeutService.DodajFizioterapeuta(this.fizioterapeutRequest).subscribe(x=>{
      console.log("Uspjesno dodan")
    });
    this.OcistiFormu();
  }

  OcistiFormu(){
    this.fizioterapeutRequest.imePrezime="";
    this.fizioterapeutRequest.jmbg="";
    this.fizioterapeutRequest.datumZaposlenja="";
    this.fizioterapeutRequest.datumRodjenja="";
    this.fizioterapeutRequest.oblastFizijatrije="";
    this.fizioterapeutRequest.poslovnaPozicijaId=0
  }
  GetAllFizioterapeuti() {
    this.fizioterapeutService.GetAllFizioterapeuti().subscribe(x=>{
      this.allFizioterapeuti = x.fizioterapeuti;
    })
  }

  getAllFizioterapeuti() {
    return this.allFizioterapeuti
  }
  Prikazi() {
     this.GetAllFizioterapeuti();
  }

  IzbrisiFizioterapeuta(item: FizioterapeutGetAllResponseFizioterapeut) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.fizioterapeutService.IzbrisiFizioterapeuta(item).subscribe(
          response => () => {
            console.log("Uspjesno obrisan korisnik")
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
  Odaberi(item: FizioterapeutGetAllResponseFizioterapeut) {
      this.fizioterapeutRequest.imePrezime=item.imePrezime
      this.fizioterapeutRequest.jmbg=item.jmbg
      this.fizioterapeutRequest.datumRodjenja=item.datumRodjenja
      this.fizioterapeutRequest.datumZaposlenja=item.datumZaposlenja
      this.fizioterapeutRequest.oblastFizijatrije=item.oblastFizijatrije
      this.fizioterapeutRequest.poslovnaPozicijaId=item.poslovnaPozicijaId
      this.fizioterapeutUpdateRequest.zaposlenikId=item.zaposlenikId

  }

    Update() {
        this.fizioterapeutUpdateRequest.imePrezime=this.fizioterapeutRequest.imePrezime
        this.fizioterapeutUpdateRequest.jmbg=this.fizioterapeutRequest.jmbg
        this.fizioterapeutUpdateRequest.datumRodjenja=this.fizioterapeutRequest.datumRodjenja
        this.fizioterapeutUpdateRequest.datumZaposlenja=this.fizioterapeutRequest.datumZaposlenja
        this.fizioterapeutUpdateRequest.oblastFizijatrije=this.fizioterapeutRequest.oblastFizijatrije
        this.fizioterapeutUpdateRequest.poslovnaPozicijaId=this.fizioterapeutRequest.poslovnaPozicijaId

       this.fizioterapeutService.UpdateFizioterapeuta(this.fizioterapeutUpdateRequest).subscribe(x=>{
         console.log("Uspjesno obrisan")
       });
        this.OcistiFormu();

    }
}
