import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {DoktorRequest} from "./doktorRequest";
import {map, Observable} from "rxjs";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {MyConfig} from "../my-config";
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DoktorGetAllResponse, DoktorGetAllResponseDoktor} from "./doktorGetAllResponse";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {DoktorUpdateRequest} from "./doktorUpdateRequest";
import {DoktorService} from "../Services/DoktorService";

@Component({
  selector: 'app-doktor',
  standalone: true,
    imports: [CommonModule, FormsModule,HttpClientModule],
    providers: [DoktorService],
  templateUrl: './doktor.component.html',
  styleUrl: './doktor.component.css'
})
export class DoktorComponent implements OnInit{

    constructor(public httpClient: HttpClient,private dialog: MatDialog, private doktorService: DoktorService) {
    }

    ngOnInit(): void {
        this.GetAllPoslovnaPozicija().subscribe((data)=>{
            this.poslovnePozicije=data;
        })

    }

    poslovnePozicije:GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]=[];
    allDoktori:DoktorGetAllResponseDoktor[]=[];

    public doktorRequest: DoktorRequest = {
    imePrezime: "",
    jmbg: "",
    datumRodjenja: "",
    datumZaposlenja: "",
    nalogId: null,
    poslovnaPozicijaId: 0,
    nazivKlinike: "",
    oblastMedicine: "",
    specijalizacija: ""

  }

  public updateDoktorRequest: DoktorUpdateRequest = {
    zaposlenikId:0,
    imePrezime: "",
    jmbg: "",
    datumRodjenja: "",
    datumZaposlenja: "",
    nalogId: null,
    poslovnaPozicijaId: 0,
    nazivKlinike: "",
    oblastMedicine: "",
    specijalizacija: ""

  }
  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).pipe(
      map((response)=>response.poslovnePozicije)
    )
  }


    Dodaj() {
      //let url=MyConfig.adresa_servera + `/Doktor-dodaj`;
      //console.log(this.doktorRequest);
        //this.httpClient.post(url, this.doktorRequest).subscribe(response=>{
          //console.log("Doktor uspjesno dodan");
        //});

      this.doktorService.DodajDoktora(this.doktorRequest).subscribe((request:any) => {
        console.log("Korisnicki nalog dodan za ", request)
      });

    }


    GetAllDoktori() {

       this.doktorService.GetAllDoktori().subscribe(x=>{
         this.allDoktori = x.doktori;
       })

    }

    getAllDoktori() {
        return this.allDoktori;
    }
    IzbrisiDoktora(item: DoktorGetAllResponseDoktor) {
      const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nalog?');
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.doktorService.IzbrisiDoktora(item).subscribe(
            response => () => {
              this.getAllDoktori(); // ili samo ispisat da je uspjesno izgrisano
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
    Odaberi(item: DoktorGetAllResponseDoktor) {
      this.doktorRequest.imePrezime=item.imePrezime
      this.doktorRequest.jmbg=item.jmbg
      this.doktorRequest.datumRodjenja=item.datumRodjenja
      this.doktorRequest.datumZaposlenja=item.datumZaposlenja
      this.doktorRequest.specijalizacija=item.specijalizacija
      this.doktorRequest.oblastMedicine=item.oblastMedicine
      this.doktorRequest.nazivKlinike=item.nazivKlinike
      this.doktorRequest.poslovnaPozicijaId=item.poslovnaPozicijaId
      this.updateDoktorRequest.zaposlenikId=item.zaposlenikId


    }

  Update() {
    this.updateDoktorRequest.imePrezime=this.doktorRequest.imePrezime
    this.updateDoktorRequest.jmbg=this.doktorRequest.jmbg
    this.updateDoktorRequest.datumRodjenja=this.doktorRequest.datumRodjenja
    this.updateDoktorRequest.datumZaposlenja=this.doktorRequest.datumZaposlenja
    this.updateDoktorRequest.specijalizacija=this.doktorRequest.specijalizacija
    this.updateDoktorRequest.oblastMedicine=this.doktorRequest.oblastMedicine
    this.updateDoktorRequest.nazivKlinike=this.doktorRequest.nazivKlinike
    this.updateDoktorRequest.poslovnaPozicijaId=this.doktorRequest.poslovnaPozicijaId


    console.log(this.updateDoktorRequest)
    this.doktorService.UpdateDoktora(this.updateDoktorRequest).subscribe(x=>{
      console.log("Uspjesno updateovan korisnik")
    });
  }


  Prikazi() {
    this.GetAllDoktori();
  }
}
