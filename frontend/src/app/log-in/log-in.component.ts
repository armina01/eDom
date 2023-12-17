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

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
 providers: [MyAuthService, { provide: HTTP_INTERCEPTORS, useClass: MyAuthInterceptor, multi: true }],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  constructor(public httpClient:HttpClient, private router: Router, private myAuthService:MyAuthService) { }

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
        let token = x.logInInformacija.autentifikacijaToken?.vrijednost;
        console.log(token);
          this.myAuthService.setLogiraniKorisnik(x.logInInformacija.autentifikacijaToken);
        this.router.navigate(["/home"])
      }
    });
  }
}
