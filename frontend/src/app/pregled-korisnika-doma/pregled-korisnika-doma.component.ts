import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {KorisnikDomaGetAllResponse, KorisnikDomaGetAllResponseKorisnik} from "./korisnikDoma-getAll-response";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MyConfig} from "../my-config";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarningDialogComponent} from "../warning-dialog/warning-dialog.component";
import {KorisnikDomaUpdateRequest} from "./korisnikDomaUpdateRequest";
import {OpsinaGetAllResponseOpstina, OpstinaGetAllResponse} from "../opstina/opstina-getAll";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {NavBarNjejgovateljComponent} from "../nav-bar-njejgovatelj/nav-bar-njejgovatelj.component";
import {MyAuthService} from "../Services/MyAuthService";
import {NavBarNutricionistaComponent} from "../nav-bar-nutricionista/nav-bar-nutricionista.component";
import {SignalRService} from "../Services/signalR.service";
import {NotifikacijaResponse, NotifikacijaResponseNotifikacija} from "../Services/notifikacijaRequest";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {KorisnikDomaService} from "../Services/KorisnikDomaService";
import {GetAllPoslovnaPozicijaResponsePoslovnaPozicija} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {NavBarDoktorComponent} from "../nav-bar-doktor/nav-bar-doktor.component";
import {faBell, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../Services/AlertService";
import {NavBarFizioterapeutComponent} from "../nav-bar-fizioterapeut/nav-bar-fizioterapeut.component";
import {AlertComponent} from "../alert/alert.component";
import {NavBarAdminComponent} from "../nav-bar-admin/nav-bar-admin.component";


@Component({
  selector: 'app-pregled-korisnika-doma',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarNjejgovateljComponent, NavBarNutricionistaComponent,
    NavBarDoktorComponent, FaIconComponent, FontAwesomeModule, NavBarFizioterapeutComponent, AlertComponent, NavBarAdminComponent],
  providers: [MyAuthService, SignalRService, KorisnikDomaService],
  templateUrl: './pregled-korisnika-doma.component.html',
  styleUrls: ['./pregled-korisnika-doma.component.css']  // Ispravljeno u styleUrls
})
export class PregledKorisnikaDomaComponent implements  OnInit{

  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router
  , private _myAuthService:MyAuthService, private signalRService: SignalRService,
              private korisnikDomaService:KorisnikDomaService, private myAlert:AlertService) {}

  public korisnikUpdateRequest: KorisnikDomaUpdateRequest ={
    korisnikDomaID:0,
    imePrezime:"",
    jmbg: "",
    datumRodjenja: "",
    brojSobe: 0,
    opstinaID:0,
    slika_base64_format:""

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
  jeFizioterapeut:boolean=false;
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
    else if(this._myAuthService.jeAdmin()){
      this.jeAdmin=true;
    }
    else if(this._myAuthService.jeFizioterapeut()){
      this.jeFizioterapeut=true;
    }

    this.getAllKorisnici();

  }
  getAllKorisnici()
  {
    this.korisnikDomaService.GetAllKorisnici().subscribe({
      next: (data) => {
        this.korisnici = data.korisnici;
        this.korisnici.forEach(k => {
          k.random = this.getRandomNumber();
          k.slikaKorisnika = k.slikaKorisnika + '?random=' + k.random;
        });
      },
      error: (err) => {
        alert("greska: " + err.error);
      }
    });
  }
  getFiltriraniKorisnici() {
    return this.korisnici.filter(x=>(x.imePrezime.toLowerCase()).startsWith(this.pretragaNaziv.toLowerCase()))
  }

    public obavijesti: any;


  ObrisiKorisnika(data: KorisnikDomaGetAllResponseKorisnik) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati opštinu?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.korisnikDomaService.IzbrisiKorisnikaDoma(data.korisnikDomaID).subscribe(
          response => {
              this.myAlert.showSuccess("Korisnik doma uspješno obrisan");
              this.ngOnInit();
          },
          (error: any) => {
            console.error('Error:', error);

            if (error.status === 500) {
              alert('Nije moguće izbrisati korisnika');
              console.error('Handle 500 error here');
            } else {
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
        if (!this.odabraniKorisnik) {
            console.warn("Nema odabranog korisnika za ažuriranje.");
            return;
        }

        this.korisnikDomaService.UpdateKorisnikaDoma(this.odabraniKorisnik).subscribe({
            next: (res) => {

                this.myAlert.showSuccess("Korisnik doma uspješno ažuriran");
                this.getAllKorisnici();
            },
            error: (error) => {
                console.error("Greška pri ažuriranju korisnika:", error);
                this.myAlert.showError("Došlo je do greške prilikom ažuriranja.");
            }
        });

        this.odabraniKorisnik = null;
    }


  OdaberiKorisnika(item: KorisnikDomaGetAllResponseKorisnik) {
    const datumRodjenja = item.datumRodjenja;
    const formattedDatum = this.formatDate(datumRodjenja);

    this.odabraniKorisnik={
      korisnikDomaID:item.korisnikDomaID,
      imePrezime: item.imePrezime,
      jmbg: item.jmbg,
      datumRodjenja: formattedDatum,
      brojSobe: item.brojSobe,
      opstinaID:item.opstinaID,
      slika_base64_format:""

    }

    this.GetAllOpstine().subscribe((data)=>{
      this.options=data;
    });

  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // 'en-CA' koristi format yyyy-MM-dd
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

  protected readonly MyConfig = MyConfig;

  generisi_preview() {
    // @ts-ignore
    var file = document.getElementById("slika-input").files[0];
    if (file)
    {
      var reader = new FileReader();
      reader.onload = ()=>{
        this.odabraniKorisnik!.slika_base64_format = reader.result?.toString();
      }
      reader.readAsDataURL(file)
    }

  }

  private getRandomNumber() {
    let min = 1;
    let max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ObrisiSlikuKorisnika(korisnikDomaID: number) {
    const dialogRef:MatDialogRef<WarningDialogComponent, boolean>=this.openWarningDialog('Da li ste sigurni da želite izbrisati sliku korisnika?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.korisnikDomaService.IzbrisiSlikuKorisnika(korisnikDomaID).subscribe(
          response  => {
            this.myAlert.showSuccess("Slika uspješno obrisana")
            this.getAllKorisnici();
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
  DodajPlanIshrane(item: KorisnikDomaGetAllResponseKorisnik) {
    this.router.navigate(['/dodajplanishrane', item.korisnikDomaID]);
  }


  jeAdmin: any;
    protected readonly faEye = faEye;
    protected readonly faEyeSlash = faEyeSlash;
    protected readonly faBell = faBell;

  DodajPregledTerapija() {
    this.router.navigate(['fizioTerapija']);
  }
}
