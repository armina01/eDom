import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DodajNjegovateljaRequest} from "../njegovatelj/dodajNjegovateljaRequest";
import {DodajNutricionistuRequest} from "./dodajNutricionistuRequest";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {map, Observable} from "rxjs";
import {MyConfig} from "../my-config";
import {
  GetAllNjegovateljaResponseNjegovatelj,
  GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {jePrazno} from "../Helper/Provjera";
import {GetAllNutricionistaResponseNutricionista, GetAllNutricionisteResponse} from "./getAllNutricionisteResponse";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";

@Component({
  selector: 'app-nutricionista',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nutricionista.component.html',
  styleUrls: ['./nutricionista.component.css']
})
export class NutricionistaComponent {
  isValid: boolean = false;

  validateInput(data:string) {
    const regex = /^\d{13}$/;
    this.isValid = regex.test(data);
  }
  showError: number=0;
  constructor(private httpClient: HttpClient,private dialog: MatDialog) {}

  public poslovnaPozicija: GetAllPoslovnaPozicijaResponsePoslovnaPozicija[] = [];
  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).pipe(
        map((response)=>response.poslovnePozicije)
    )
  }

  public dodajNutricionistu: DodajNutricionistuRequest={
    imePrezime:"",
    jmbg:"",
    datumRodjenja: new Date() ,
    datumZaposlenja: new Date(),
    nalogId: null,
    poslovnaPozicijaId:0,
    oblastNutricionizma:"",
    nutricionistickiCentar:"",
  }
  ngOnInit() {
    this.GetAllPoslovnaPozicija().subscribe((data)=>{
      this.poslovnaPozicija=data;
    })
  }
  DodajNutricionistu() {
    if(jePrazno(this.dodajNutricionistu.imePrezime) && jePrazno(this.dodajNutricionistu.jmbg)
        && jePrazno(this.dodajNutricionistu.poslovnaPozicijaId) && jePrazno(this.dodajNutricionistu.nutricionistickiCentar)
    && jePrazno(this.dodajNutricionistu.oblastNutricionizma))
    {
      let url: string = MyConfig.adresa_servera + `/dodajNutricionistu`;
      this.httpClient.post(url, this.dodajNutricionistu).subscribe(request => {
        console.log("Korisnicki nalog dodan za ", request)
      })}
    else {
      this.showError=1;
    }
  }
  public getNutricioniste:GetAllNutricionistaResponseNutricionista[]=[];
  GetAllNutricionisti() {
    let url: string = MyConfig.adresa_servera + `/getAllNutricioniste`;
    this.httpClient.get<GetAllNutricionisteResponse>(url).subscribe(x => {
      this.getNutricioniste = x.nutricionisti;
    })
  }
  getAllNutricionisti(){
    return this.getNutricioniste;
  }

  IzbrisiNutricionistu(item: GetAllNutricionistaResponseNutricionista) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati nutricionistu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/izbrisiNutricionistu`;
        const params = new HttpParams().set('ZaposlenikId', item.zaposlenikId);
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
  public updatedNutricionista:GetAllNutricionistaResponseNutricionista={
    zaposlenikId:0,
    imePrezime:"",
    jmbg:"",
    datumRodjenja: new Date() ,
    datumZaposlenja: new Date(),
    nalogId: null,
    poslovnaPozicijaId:0,
    nutricionistickiCentar:"",
    oblastNutricionizma:"",
  }

  SelectNutricionistu(item: GetAllNutricionistaResponseNutricionista) {
    this.dodajNutricionistu.imePrezime=item.imePrezime;
    this.dodajNutricionistu.jmbg=item.jmbg;
    this.dodajNutricionistu.oblastNutricionizma=item.oblastNutricionizma;
    this.dodajNutricionistu.nutricionistickiCentar=item.nutricionistickiCentar;
    this.dodajNutricionistu.datumZaposlenja=item.datumZaposlenja;
    this.dodajNutricionistu.datumRodjenja=item.datumRodjenja;
    this.dodajNutricionistu.poslovnaPozicijaId=item.poslovnaPozicijaId;
    this.updatedNutricionista.zaposlenikId=item.zaposlenikId;

  }
  UpdateNutricionistu() {
    if(jePrazno(this.dodajNutricionistu.imePrezime) && jePrazno(this.dodajNutricionistu.jmbg)
        && jePrazno(this.dodajNutricionistu.poslovnaPozicijaId) ) {
      this.updatedNutricionista.imePrezime = this.dodajNutricionistu.imePrezime;
      this.updatedNutricionista.jmbg = this.dodajNutricionistu.jmbg;
      this.updatedNutricionista.oblastNutricionizma = this.dodajNutricionistu.oblastNutricionizma;
      this.updatedNutricionista.nutricionistickiCentar = this.dodajNutricionistu.nutricionistickiCentar;
      this.updatedNutricionista.datumZaposlenja = this.dodajNutricionistu.datumZaposlenja;
      this.updatedNutricionista.datumRodjenja = this.dodajNutricionistu.datumRodjenja;
      this.updatedNutricionista.poslovnaPozicijaId = this.dodajNutricionistu.poslovnaPozicijaId;
      let url: string = MyConfig.adresa_servera + `/updateNutricionistu`;
      this.httpClient.post(url, this.updatedNutricionista).subscribe(request => {
        console.log(request)
      })
    }
    else {
      this.showError=1;
    }
  }
}
