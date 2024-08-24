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
    public odabraniDoktor:DoktorGetAllResponseDoktor | null=null;
    public prikaziTabelu:boolean=false;

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

      this.odabraniDoktor = {
        imePrezime:item.imePrezime,
        jmbg:item.jmbg,
        datumRodjenja:item.datumRodjenja,
        datumZaposlenja:item.datumZaposlenja,
        specijalizacija:item.specijalizacija,
        oblastMedicine:item.oblastMedicine,
        nazivKlinike:item.nazivKlinike,
        poslovnaPozicijaId:item.poslovnaPozicijaId,
        zaposlenikId:item.zaposlenikId,
        nalogId:item.nalogId

      } ;

    }

  Update() {
    console.log(this.odabraniDoktor)
    this.doktorService.UpdateDoktora(this.odabraniDoktor).subscribe(x=>{
      console.log("Uspjesno updateovan korisnik")
    });
  }


  Prikazi() {
    this.GetAllDoktori();
    this.prikaziTabelu=true;
  }
}
