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
import {NutricionistaService} from "../Services/NutricionistaService";
import {KorisnickiNalogRequest} from "../korisnicki-nalog/korisnickiNalogRequest";
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";

@Component({
  selector: 'app-nutricionista',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers:[NutricionistaService,KorisnickiNalogService],
  templateUrl: './nutricionista.component.html',
  styleUrls: ['./nutricionista.component.css']
})
export class NutricionistaComponent {
  isValid: boolean = false;
  showFirstForm=true;
  validateInput(data:string) {
    const regex = /^\d{13}$/;
    this.isValid = regex.test(data);
  }
  showError: boolean=false;
  constructor(private httpClient: HttpClient,private dialog: MatDialog,
              private nutricionistaService:NutricionistaService,public korisnickiNalogService : KorisnickiNalogService) {}

  public poslovnaPozicija: GetAllPoslovnaPozicijaResponsePoslovnaPozicija[] = [];
  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).pipe(
        map((response)=>response.poslovnePozicije)
    )
  }
  public korisnickiNalogRequest: KorisnickiNalogRequest = {
    korisnickoIme: "",
    lozinka: "",
    email:"",
    jeAdmin: false,
    jeDoktor: false,
    jeFizioterapeut: false,
    jeNjegovatelj: false,
    jeNutricionista: true,
    je2FActive:true,
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
      this.nutricionistaService.DodajNutricionistu(this.dodajNutricionistu).subscribe((request:any) => {
        console.log("Korisnicki nalog dodan za ", request)
        this.showFirstForm=false;
        this.updatedNutricionista.zaposlenikId= request.zaposlenikId;
      })
    }
    else {
      this.showError=true;
    }
  }
  public getNutricioniste:GetAllNutricionistaResponseNutricionista[]=[];
  prikaziTabelu=false;
  PregledajNutricioniste(){
    this.prikaziTabelu=true;
    this.GetAllNutricionisti();
  }
  GetAllNutricionisti() {
    this.nutricionistaService.GetAllNutricionisti().subscribe(x => {
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
        this.nutricionistaService.IzbrisiNutricioniste(item).subscribe(
            response => () => {
              this.GetAllNutricionisti();
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
    this.validateInput(this.updatedNutricionista.jmbg);
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
      this.updatedNutricionista.nalogId=this.dodajNutricionistu.nalogId??null;
      this.nutricionistaService.UpdateNutricionistu(this.updatedNutricionista).subscribe(request => {
        console.log(request)
        this.showFirstForm=true;
        this.showError=false;
        this.GetAllNutricionisti();
        this.showConfirmationDialog = true;
        this.setAutoHide();
        this.Clean();
      })
    }
    else {
      this.showError=true;
    }
  }
  public showConfirmationDialog: boolean = false;
  setAutoHide() {
    setTimeout(() => {
      this.showConfirmationDialog = false;

    }, 3000);
  }
  prikaziErrorNalog:boolean=false
  AddKorisnickiNalog(): void {
    this.korisnickiNalogService.DodajKorisnickiNalog( this.korisnickiNalogRequest).subscribe(request => {
      console.log("Request",request)
      this.showError=false;
      this.dodajNutricionistu.nalogId = request.korisnikId
      this.UpdateNutricionistu();
    },(error: any) => {
      console.log("Error")
      this.prikaziErrorNalog=true;
    })
  }
  private Clean() {
    this.dodajNutricionistu.imePrezime="";
    this.dodajNutricionistu.jmbg="";
    this.dodajNutricionistu.oblastNutricionizma="";
    this.dodajNutricionistu.nutricionistickiCentar="";
    this.dodajNutricionistu.poslovnaPozicijaId=0;
  }
}
