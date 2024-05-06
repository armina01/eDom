import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLogInRequest } from "./AuthLogInRequest";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import {MyConfig} from '../my-config';
import {AuthLogInResponse} from "./AuthLogInResponse";
import {FormsModule} from "@angular/forms";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {MyAuthService} from "../Services/MyAuthService";
import {MyAuthInterceptor} from "../Helper/MyAuthInterceptor";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {map, Observable} from "rxjs";
import {GetAllZaposlenikResponse, GetAllZaposlenikResponseZaposlenik} from "../Services/getAllZaposleniciResponse";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {SignalRService} from "../Services/signalR.service";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule,FontAwesomeModule],
 providers: [MyAuthService, { provide: HTTP_INTERCEPTORS, useClass: MyAuthInterceptor, multi: true }],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  constructor(public httpClient:HttpClient, private router: Router, private myAuthService:MyAuthService,private signalRService: SignalRService
             ) { }

  ngOnInit(){
    this.GetAllzaposlenici().subscribe(
        response => {
          this.korisnik = response;
        });
    //this.signalRService.otvori_ws_konekciju();
  }
  GetAllzaposlenici(): Observable<GetAllZaposlenikResponseZaposlenik[]> {
    let url: string = MyConfig.adresa_servera + `/getAllZaposlenici`;

    // Return the observable from the HttpClient
    return this.httpClient.get<GetAllZaposlenikResponse>(url).pipe(
        map(response => response.zaposlenici || [])
    );
  }
  public korisnik:GetAllZaposlenikResponseZaposlenik[]=[];
  public _korisnickiNalog:AuthLogInRequest| undefined=undefined;
  public logInRequest:AuthLogInRequest={
    korisnickoIme:"",
    lozinka:"",
    jeAdmin: false,
    jeDoktor:false,
    jeFizioterapeut:false,
    jeNjegovatelj:false,
    jeNutricionista:false,
    SignalRConnectionID:""
  }
  public lozinkaNeTacna=false;
  signIn() {
    this.GetAllKorisnickiNalog();

    let url=MyConfig.adresa_servera+`/login`;

    this.logInRequest.SignalRConnectionID=SignalRService.ConnectionId;

    this.httpClient.post<AuthLogInResponse>(url, this.logInRequest).subscribe((x)=>{

      if (!x.logInInformacija.isLogiran){
            this.lozinkaNeTacna=true;
      }
      else{
        let korisnikNalogId=x.logInInformacija.autentifikacijaToken.korisnickiNalogId
        console.log(korisnikNalogId)
        let _korisnik=this.korisnik.find(
            item=>item.nalogId===korisnikNalogId)
          this.myAuthService.setLogiraniKorisnik(x.logInInformacija.autentifikacijaToken,_korisnik);

        this.router.navigate(["/pregledKorisnikaDoma"])
      }
    },
      (error) => {
        this.lozinkaNeTacna=true;
      });
    this.signalRService.otvori_ws_konekciju();

  }
  GetAllKorisnickiNalog() {
    let url: string = MyConfig.adresa_servera + `/get-all-KorisnickiNalog`;
    this.httpClient.get<GetAllKorisnickiNalogResponse>(url).subscribe(

      response => {
        console.log(response.korisnickiNalozi);
        this._korisnickiNalog = response.korisnickiNalozi.find(nalog =>
          nalog.korisnickoIme === this.logInRequest.korisnickoIme
        );
        console.log(this._korisnickiNalog)
        if (this._korisnickiNalog) {
          this.logInRequest.jeAdmin = this._korisnickiNalog.jeAdmin;
          this.logInRequest.jeNutricionista = this._korisnickiNalog.jeNutricionista;
          this.logInRequest.jeDoktor = this._korisnickiNalog.jeDoktor;
          this.logInRequest.jeNjegovatelj = this._korisnickiNalog.jeNjegovatelj;
          this.logInRequest.jeFizioterapeut = this._korisnickiNalog.jeFizioterapeut;
          let url=MyConfig.adresa_servera+`/login`;
          this.httpClient.post<AuthLogInResponse>(url, this.logInRequest).subscribe((x)=>{

              if (!x.logInInformacija.isLogiran){
                this.lozinkaNeTacna=true;
              }
              else{
                let korisnikNalogId=x.logInInformacija.autentifikacijaToken.korisnickiNalogId
                console.log(korisnikNalogId)
                let _korisnik=this.korisnik.find(
                  item=>item.nalogId===korisnikNalogId)
                this.myAuthService.setLogiraniKorisnik(x.logInInformacija.autentifikacijaToken,_korisnik);

                this.router.navigate(["/pregledKorisnikaDoma"])
              }
            },
            (error) => {
              this.lozinkaNeTacna=true;
            });
        }
      }
    );

  }

  Enable2FA() {
    this.router.navigate(["/autorizacija"])
  }
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
