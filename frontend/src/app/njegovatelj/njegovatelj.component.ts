import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {DodajNjegovateljaRequest} from "./dodajNjegovateljaRequest";
import {GetAllNjegovateljaResponseNjegovatelj, GetAllNjegovateljiResponse} from "./getAllNjegovateljiResponse";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import{jePrazno} from "../Helper/Provjera";
import {GetAllZaposlenikResponse, GetAllZaposlenikResponseZaposlenik} from "./getAllZaposleniciResponse";
import {UpdateNjegovateljRequest} from "./updateNjegovateljRequest";

@Component({
  selector: 'app-njegovatelj',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './njegovatelj.component.html',
  styleUrl: './njegovatelj.component.css'
})
export class NjegovateljComponent {

  isValid: boolean = false;

  validateInput() {
    const regex = /^\d{13}$/;
    this.isValid = regex.test(this.njegovatelj.jmbg);
  }
  showError: number=0;
  constructor(private httpClient: HttpClient,private dialog: MatDialog) {}

  poslovnaPozicija: GetAllPoslovnaPozicijaResponsePoslovnaPozicija[] = [];
  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).pipe(
        map((response)=>response.poslovnePozicije)
    )
  }
  public updNjegovateljRequest:GetAllNjegovateljaResponseNjegovatelj={
    zaposlenikId:0,
    imePrezime:"",
    jmbg:"",
    datumRodjenja: new Date() ,
    datumZaposlenja: new Date(),
    nalogId: null,
    poslovnaPozicijaId:0,
    isNjegovatelj:false,
    isMedicinskiTehnicar:false,
    brojPacijenata:0,
  }

  public njegovatelj: DodajNjegovateljaRequest={
    imePrezime:"",
    jmbg:"",
    datumRodjenja: new Date() ,
    datumZaposlenja: new Date(),
    nalogId: null,
    poslovnaPozicijaId:0,
    isNjegovatelj:false,
    isMedicinskiTehnicar:false,
    brojPacijenata:0,
  }
  ngOnInit() {


    this.GetAllPoslovnaPozicija().subscribe((data)=>{
      this.poslovnaPozicija=data;
    })

  }
  onChange() {
      console.log('Selected Option:', this.njegovatelj.nalogId);
    console.log('Selected Poslovna pozicija:', this.njegovatelj.poslovnaPozicijaId
    );
  }

  DodajNjegovatelja() {
    if(jePrazno(this.njegovatelj.imePrezime) && jePrazno(this.njegovatelj.jmbg)
        && jePrazno(this.njegovatelj.poslovnaPozicijaId) )
    {
      let url: string = MyConfig.adresa_servera + `/dodajNjegovatelja`;
    this.httpClient.post(url, this.njegovatelj).subscribe(request => {
      console.log("Korisnicki nalog dodan za ", request)
    })}
    else {
      this.showError=1;
    }

  }
  public allNjegovatelji: GetAllNjegovateljaResponseNjegovatelj[]=[];
  GetAllNjegovatelji() {
    let url: string = MyConfig.adresa_servera + `/getAllNjegovatelji`;
    this.httpClient.get<GetAllNjegovateljiResponse>(url).subscribe(x => {
      this.allNjegovatelji = x.njegovatelji;
    })
  }
  getAllNjegovatelji() {
    return this.allNjegovatelji;
  }

  IzbrisiNjegovatelja(data: GetAllNjegovateljaResponseNjegovatelj) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/izbrisiNjegovatelja`;
        const params = new HttpParams().set('NjegovateljId', data.zaposlenikId);
        this.httpClient.delete(url, {params}).subscribe(
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


  UpdateNjegovatelj() {
    let url: string = MyConfig.adresa_servera + `/updateNjegovatelja`;
    console.log(this.updNjegovateljRequest)
    this.httpClient.post(url, this.updNjegovateljRequest).subscribe(request => {
      console.log("Korisnicki nalog dodan za ", request)
    })
  }
  SelectNjegovatelja(item: GetAllNjegovateljaResponseNjegovatelj) {
    this.njegovatelj.imePrezime=item.imePrezime;
    this.njegovatelj.jmbg=item.jmbg;
    this.njegovatelj.isNjegovatelj=item.isNjegovatelj;
    this.njegovatelj.isMedicinskiTehnicar=item.isMedicinskiTehnicar;
    this.njegovatelj.datumZaposlenja=item.datumZaposlenja;
    this.njegovatelj.datumRodjenja=item.datumRodjenja;
    this.njegovatelj.poslovnaPozicijaId=item.poslovnaPozicijaId;
    this.updNjegovateljRequest.zaposlenikId=item.zaposlenikId;
    this.updNjegovateljRequest.imePrezime=item.imePrezime;
    this.updNjegovateljRequest.jmbg=item.jmbg;
    this.updNjegovateljRequest.isNjegovatelj=item.isNjegovatelj;
    this.updNjegovateljRequest.isMedicinskiTehnicar=item.isMedicinskiTehnicar;
    this.updNjegovateljRequest.datumZaposlenja=item.datumZaposlenja;
    this.updNjegovateljRequest.datumRodjenja=item.datumRodjenja;
    this.updNjegovateljRequest.poslovnaPozicijaId=item.poslovnaPozicijaId;
  }
}
