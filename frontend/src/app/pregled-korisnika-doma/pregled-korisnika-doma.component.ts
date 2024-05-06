import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {KorisnikDomaGetAllResponse, KorisnikDomaGetAllResponseKorisnik} from "./korisnikDoma-getAll-response";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {KorisnikDomaUpdateRequest} from "./korisnikDomaUpdateRequest";
import {OpsinaGetAllResponseOpstina, OpstinaGetAllResponse} from "../opstina/opstina-getAll";
import {map, Observable} from "rxjs";
import {KorisnikComponent} from "../korisnik/korisnik.component";
import {Router} from "@angular/router";
import {NavBarNjejgovateljComponent} from "../nav-bar-njejgovatelj/nav-bar-njejgovatelj.component";
import {MyAuthService} from "../Services/MyAuthService";
import {NavBarNutricionistaComponent} from "../nav-bar-nutricionista/nav-bar-nutricionista.component";
import {SignalRService} from "../Services/signalR.service";
import {NotifikacijaResponse, NotifikacijaResponseNotifikacija} from "../Services/notifikacijaRequest";
import {faBell, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@Component({
  selector: 'app-pregled-korisnika-doma',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarNjejgovateljComponent, NavBarNutricionistaComponent, FaIconComponent,FontAwesomeModule],
  providers:[MyAuthService,SignalRService],
  templateUrl: './pregled-korisnika-doma.component.html',
  styleUrl: './pregled-korisnika-doma.component.css'
})
export class PregledKorisnikaDomaComponent implements  OnInit{

  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router
  , private _myAuthService:MyAuthService, private signalRService: SignalRService) {}

  public korisnikUpdateRequest: KorisnikDomaUpdateRequest ={
    korisnikDomaID:0,
    imePrezime:"",
    jmbg: "",
    datumRodjenja: "",
    brojSobe: 0,
    opstinaID:0

  }
  public hasNewNotification: boolean = false;
  obavijetUkljucena:boolean=false;
  pretragaNaziv="";
  korisnici:KorisnikDomaGetAllResponseKorisnik[]=[];
  public odabraniKorisnik: KorisnikDomaUpdateRequest | null=null;
  options:OpsinaGetAllResponseOpstina[]=[];
  forma: any;
  jeNjegovatelj=false;
  jeNutricionista=false;
  jeDoktor=false;
  public notification2="";
  ngOnInit(): void {
    if(this._myAuthService.jeNjegovatelj())
    {
      this.jeNjegovatelj=true;
    }else if (this._myAuthService.jeNutricionista()) {
      this.jeNutricionista=true;
    }else if(this._myAuthService.jeDoktor())
    {
      this.jeDoktor=true;
    }
    let url =MyConfig.adresa_servera +`/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x:KorisnikDomaGetAllResponse)=>{
      this.korisnici = x.korisnici;
    })
  }
  getFiltriraniKorisnici() {
    return this.korisnici.filter(x=>(x.imePrezime.toLowerCase()).startsWith(this.pretragaNaziv.toLowerCase()))
  }

    public obavijesti: any;


  ObrisiKorisnika(data: KorisnikDomaGetAllResponseKorisnik) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati opštinu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let url: string = MyConfig.adresa_servera + `/korisnikDoma-obrisi`;
        const params = new HttpParams().set('KorisnikDomaID', data.korisnikDomaID);
        this.httpClient.delete(url, {params}).subscribe(
          response => () => {
            console.log("Deleted item")
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati korisnika');
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


  UpdateKorisnika() {
    let podaci=this.odabraniKorisnik
    console.log(podaci);
    const url = MyConfig.adresa_servera+`/korisnikDoma-update`;
    this.httpClient.post(url, podaci).subscribe((res) =>
      console.log("Korisnik doma updatovan"))
  }

  OdaberiKorisnika(item: KorisnikDomaGetAllResponseKorisnik) {
    this.odabraniKorisnik={
      korisnikDomaID:item.korisnikDomaID,
      imePrezime: item.imePrezime,
      jmbg: item.jmbg,
      datumRodjenja: item.datumRodjenja,
      brojSobe: item.brojSobe,
      opstinaID:item.opstinaID

    }
    console.log(this.odabraniKorisnik);
    this.GetAllOpstine().subscribe((data)=>{
      this.options=data;
    });

  }
  GetAllOpstine(): Observable<OpsinaGetAllResponseOpstina[]>{
    let url=MyConfig.adresa_servera + `/opstina-getAll`
    return this.httpClient.get<OpstinaGetAllResponse>(url).pipe(
      map((response:OpstinaGetAllResponse)=>response.opstine)
    );
  }


  PrikaziNapomene(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregledNapomena', item.korisnikDomaID]);

  }

  PrikaziAktivneNapomene(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregledAktivnihNapomena', item.korisnikDomaID]);
  }

  PregledZadataka(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregleddnevnihzadataka', item.korisnikDomaID]);
  }

  PregledSedmicnihZadataka(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregledsedmicnihzadataka', item.korisnikDomaID]);
  }

  PregledArhiveZadataka(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/pregledarhivezadataka', item.korisnikDomaID]);

  }

  DodajPlanIshrane(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/dodajplanishrane', item.korisnikDomaID]);
  }


  protected readonly MyConfig = MyConfig;
  jeAdmin: any;
    protected readonly faEye = faEye;
    protected readonly faEyeSlash = faEyeSlash;
    protected readonly faBell = faBell;
}
