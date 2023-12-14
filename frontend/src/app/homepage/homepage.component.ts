import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {MyConfig} from "../my-config";
import {AutentifikacijaToken} from "../log-in/AuthLogInResponse";
import {AuthLogInRequest} from "./authLogInRequest";
import {map, Observable} from "rxjs";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {MyAuthService} from "../Services/MyAuthService";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  providers: [MyAuthService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(public httpClient:HttpClient, private router: Router,private myAuthService:MyAuthService) { }

  ngOnInit() {
      if(this.myAuthService.jeAdmin())
      {
        console.log("Okay")
      }else {
        console.log(this.myAuthService.getAuthorizationToken())
          this.router.navigate(["/login"])
      }
  }
}
