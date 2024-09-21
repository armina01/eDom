import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {map, Observable, pipe} from "rxjs";
import { HttpClient,  HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {DodajNjegovateljaRequest} from "./dodajNjegovateljaRequest";
import {GetAllNjegovateljaResponseNjegovatelj} from "./getAllNjegovateljiResponse";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import{jePrazno} from "../Helper/Provjera";
import { MyAuthService} from "../Services/MyAuthService";
import {Router} from "@angular/router";
import {NjegovateljiService} from "../Services/NjegovateljService";
import {PoslovnaPozicijaService} from "../Services/PoslovnaPozicijaService";
import {GetAllKorisnickiNalogResponseKorisnickiNalog} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";
import {NavBarAdminComponent} from "../nav-bar-admin/nav-bar-admin.component";
import {KorisnickiNalogRequest} from "../korisnicki-nalog/korisnickiNalogRequest";

@Component({
  selector: 'app-njegovatelj',
  standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, NavBarAdminComponent],
  providers: [MyAuthService, NjegovateljiService, HttpClient,PoslovnaPozicijaService,KorisnickiNalogService],
  templateUrl: './njegovatelj.component.html',
  styleUrl: './njegovatelj.component.css'
})
export class NjegovateljComponent {
  constructor(private httpClient: HttpClient,private dialog: MatDialog
    ,private router: Router,//@Inject(MY_AUTH_SERVICE_TOKEN)
              private _myAuthService: MyAuthService,
              private njegovateljService: NjegovateljiService,
              private poslovnaPozicijaService:PoslovnaPozicijaService,
              public korisnickiNalogService : KorisnickiNalogService
  ) {

  }
  isValid: boolean = false;
  showFirstForm: boolean = true;
  validateInput(data:string) {
    const regex = /^\d{13}$/;
    this.isValid = regex.test(data);
  }
  showError=false;


  public poslovnaPozicija: GetAllPoslovnaPozicijaResponsePoslovnaPozicija[] = [];
  GetAllPoslovnaPozicija():Observable<GetAllPoslovnaPozicijaResponsePoslovnaPozicija[]> {

    return this.poslovnaPozicijaService.GetAllPoslovnaPozicija().pipe(
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
    if(this._myAuthService.jeAdmin())
    {
      console.log("Okay")
    }else {
      console.log(this._myAuthService.getAuthorizationToken())
      this.router.navigate(["/login"])
    }

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

      this.njegovateljService.dodajNjegovatelja(this.njegovatelj).subscribe(request => {
        console.log("Korisnicki nalog dodan za ", request)
        this.showFirstForm= false;
        this.updNjegovateljRequest.zaposlenikId=request.njegovateljID;
      })}
    else {
      this.showError=true;
    }

  }
  public allNjegovatelji: GetAllNjegovateljaResponseNjegovatelj[]=[];
  GetAllNjegovatelji() {
    this.njegovateljService.GetAllNjegovatelji().subscribe((data) => {
      this.allNjegovatelji = data.njegovatelji;

    });
  }
  getAllNjegovatelji() {
    return this.allNjegovatelji;
  }

  IzbrisiNjegovatelja(data: GetAllNjegovateljaResponseNjegovatelj) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati njegovatelja?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.njegovateljService.deleteNjegovatelj(data.zaposlenikId)
            .subscribe(
                () => {
                  this.GetAllNjegovatelji();
                  // Update your component data or perform any other actions
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
                }
            );
      }
    });


  }
  public korisnickiNalogRequest: KorisnickiNalogRequest = {
    korisnickoIme: "",
    lozinka: "",
    email:"",
    jeAdmin: false,
    jeDoktor: false,
    jeFizioterapeut: false,
    jeNjegovatelj: true,
    jeNutricionista: false,
    je2FActive:true,
  }
  korisnickiNalog: GetAllKorisnickiNalogResponseKorisnickiNalog[] = [];
  public showConfirmationDialog: boolean = false;
  setAutoHide() {
    setTimeout(() => {
      this.showConfirmationDialog = false;

    }, 3000);
  }
  prikaziErrorNalog:boolean=false
  AddKorisnickiNalog(): void {
console.log(this.korisnickiNalogRequest);
    this.korisnickiNalogService.DodajKorisnickiNalog( this.korisnickiNalogRequest).subscribe(request => {
      console.log("Request",request)
      this.prikaziErrorNalog=false;
      this.showError=false;
      this.njegovatelj.nalogId = request.korisnikId
      this.UpdateNjegovatelj();
    },(error: any) => {
      console.log("Error")
        this.prikaziErrorNalog=true;
      })
  }
  openWarningDialog = (message: string): MatDialogRef<WarningDialogComponent> => {
    return this.dialog.open(WarningDialogComponent, {
      data: {message},
    });
  };


  UpdateNjegovatelj() {
    console.log("testt");
    console.log(this.njegovatelj.imePrezime,this.njegovatelj.jmbg,this.njegovatelj.poslovnaPozicijaId)
    if(jePrazno(this.njegovatelj.imePrezime) && jePrazno(this.njegovatelj.jmbg)
        && jePrazno(this.njegovatelj.poslovnaPozicijaId) ) {

      this.updNjegovateljRequest.imePrezime = this.njegovatelj.imePrezime;
      this.updNjegovateljRequest.jmbg = this.njegovatelj.jmbg;
      this.updNjegovateljRequest.isNjegovatelj = this.njegovatelj.isNjegovatelj;
      this.updNjegovateljRequest.isMedicinskiTehnicar = this.njegovatelj.isMedicinskiTehnicar;
      this.updNjegovateljRequest.datumZaposlenja = this.njegovatelj.datumZaposlenja;
      this.updNjegovateljRequest.datumRodjenja = this.njegovatelj.datumRodjenja;
      this.updNjegovateljRequest.poslovnaPozicijaId = this.njegovatelj.poslovnaPozicijaId;
      this.updNjegovateljRequest.brojPacijenata = this.njegovatelj.brojPacijenata;
      this.updNjegovateljRequest.nalogId=this.njegovatelj.nalogId??null;
      let url: string = MyConfig.adresa_servera + `/updateNjegovatelja`;
      console.log(this.updNjegovateljRequest)
      this.httpClient.post(url, this.updNjegovateljRequest).subscribe(request => {
        this.showFirstForm=true;
        this.showError=false;
        this.GetAllNjegovatelji();
        this.showConfirmationDialog = true;
        this.setAutoHide();
        this.Clean();
      })
    }
    else {
      this.showError=true;
    }
  }
  prikaziNjegovatelje=false;
  SelectNjegovatelja(item: GetAllNjegovateljaResponseNjegovatelj) {
    this.njegovatelj.imePrezime=item.imePrezime;
    this.njegovatelj.jmbg=item.jmbg;
    this.njegovatelj.isNjegovatelj=item.isNjegovatelj;
    this.njegovatelj.isMedicinskiTehnicar=item.isMedicinskiTehnicar;
    this.njegovatelj.datumZaposlenja=item.datumZaposlenja;
    this.njegovatelj.datumRodjenja=item.datumRodjenja;
    this.njegovatelj.poslovnaPozicijaId=item.poslovnaPozicijaId;
    this.njegovatelj.brojPacijenata=item.brojPacijenata;
    this.updNjegovateljRequest.zaposlenikId=item.zaposlenikId;
    this.prikaziErrorNalog=false;
    this.showError=false;
    this.validateInput(this.njegovatelj.jmbg);
  }

  PregledajNjegovatelje() {
    this.GetAllNjegovatelji()
    this.prikaziNjegovatelje=!this.prikaziNjegovatelje
  }

  private Clean() {
    this.njegovatelj.imePrezime="";
    this.njegovatelj.jmbg="";
    this.njegovatelj.isMedicinskiTehnicar=false;
    this.njegovatelj.isNjegovatelj=false;
    this.njegovatelj.poslovnaPozicijaId=0;
    this.njegovatelj.brojPacijenata=0;
  }
}
