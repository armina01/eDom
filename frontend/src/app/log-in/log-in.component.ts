import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLogInRequest } from "./AuthLogInRequest";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import {MyConfig} from '../my-config';
import {AuthLogInResponse} from "./AuthLogInResponse";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {MyAuthService} from "../Services/MyAuthService";
import {MyAuthInterceptor} from "../Helper/MyAuthInterceptor";
import {ZaposlenikEndpoint} from "../Services/ZaposlenikEndpoint";
import {map, Observable} from "rxjs";
import {GetAllZaposlenikResponse, GetAllZaposlenikResponseZaposlenik} from "../Services/getAllZaposleniciResponse";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
 providers: [MyAuthService, { provide: HTTP_INTERCEPTORS, useClass: MyAuthInterceptor, multi: true }],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  constructor(public httpClient:HttpClient, private router: Router, private myAuthService:MyAuthService,
              ) { }

  ngOnInit(){
    this.GetAllzaposlenici().subscribe(
        response => {
          this.korisnik = response;
        });
  }
  public korisnik:GetAllZaposlenikResponseZaposlenik[]=[];
  public logInRequest:AuthLogInRequest={
    korisnickoIme:"",
    lozinka:"",
    jeAdmin: false,
    jeDoktor:false,
    jeFizioterapeut:false,
    jeNjegovatelj:true,
    jeNutricionista:false
  }
  signIn() {
    let url=MyConfig.adresa_servera+`/login`;
    this.httpClient.post<AuthLogInResponse>(url, this.logInRequest).subscribe((x)=>{
      console.log("Response",x)
      if (!x.logInInformacija.isLogiran){
        console.log("Response",x)
        alert("pogresan username/pass")
      }
      else{
        let korisnikNalogId=x.logInInformacija.autentifikacijaToken.korisnickiNalogId
        console.log(korisnikNalogId)
        let _korisnik=this.korisnik.find(
            item=>item.nalogId===korisnikNalogId)
          this.myAuthService.setLogiraniKorisnik(x.logInInformacija.autentifikacijaToken,_korisnik);

        this.router.navigate(["/home"])
      }
    });
  }
  GetAllzaposlenici(): Observable<GetAllZaposlenikResponseZaposlenik[]> {
    let url: string = MyConfig.adresa_servera + `/getAllZaposlenici`;

    // Return the observable from the HttpClient
    return this.httpClient.get<GetAllZaposlenikResponse>(url).pipe(
        map(response => response.zaposlenici || []) // Extract and return zaposlenici array
    );
  }
}
