import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLogInRequest } from "./AuthLogInRequest";
import {HttpClient} from "@angular/common/http";
import {MyConfig} from '../my-config';
import {AuthLogInResponse} from "./AuthLogInResponse";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  constructor(public httpClient:HttpClient) { }

  public logInRequest:AuthLogInRequest={
    korisnickoIme:"",
    lozinka:"",
    jeAdmin: true,
    jeDoktor:false,
    jeFizioterapeut:false,
    jeNjegovatelj:false,
    jeNutricionista:false
  }
  signIn() {
    let url=MyConfig.adresa_servera+`/login`;
    this.httpClient.post<AuthLogInResponse>(url, this.logInRequest).subscribe((x)=>{
      if (!x.isLogiran){
        console.log(x)
        alert("pogresan username/pass")
      }
      else{
        let token = x.autentifikacijaToken?.vrijednost;
        console.log(token);
        window.localStorage.setItem("my-auth-token",<string>token)
        alert("tacan username/pass")
      }
    })
  }
}
