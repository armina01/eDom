import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MyAuthService} from "../Services/MyAuthService";
import {FormsModule} from "@angular/forms";
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";
import {MailService} from "../Services/MailService";
import {GetAllKorisnickiNalogResponseKorisnickiNalog} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {Enable2FAuthRequest} from "./Enable2FAuthRequest";
import {Auth2FOtkljucajRequest} from "./OtkljucajRequest";
import {catchError, finalize, throwError} from "rxjs";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-enable-2-fa',
  standalone: true,
  imports: [CommonModule, FormsModule,FontAwesomeModule],
  providers : [MailService,KorisnickiNalogService],
  templateUrl: './enable-2-fa.component.html',
  styleUrl: './enable-2-fa.component.css'
})
export class Enable2FAComponent {
  constructor(public httpClient:HttpClient, private router: Router, private myAuthService:MyAuthService,
              public korisnickiNalogService:KorisnickiNalogService,public mailService:MailService
  ) { }
  public email:string="";
  public korisnickoIme="";
  public kljuc="";
  public korisnickiNalog:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  public enable2FAuthRequest: Enable2FAuthRequest ={
    nalogId:0
  }
  public sifra="";
  public Auth2FOtkljucajRequest: Auth2FOtkljucajRequest ={
      kljuc:"",
      username:""
  }
  isSendingEmail: boolean = false;
  neispravniPodaci=false;
  neispravnoKorisnickoIme=false;
  PosaljiMail() {

    if(this.email!=="" && this.korisnickoIme!=="")
    {

      this.isSendingEmail=true;
      this.korisnickiNalogService.GetAllKorisnickiNalog().subscribe(response => {

        this.korisnickiNalog = response.korisnickiNalozi.find(x => x.korisnickoIme === this.korisnickoIme) || null;

        this.enable2FAuthRequest.nalogId = this.korisnickiNalog?.nalogId ?? 0;
        this.mailService.PosaljiMail(this.enable2FAuthRequest).pipe(
          catchError(error => {
            console.error('Error in PosaljiMail:', error);
            this.neispravnoKorisnickoIme = true;
            return throwError('An error occurred while sending mail');
          }),
        ).subscribe(()=>{console.log("Uspjesno poslano")});

      });
    }
    else{
      this.neispravniPodaci=true;
    }
  }
  public verifikacijaNijeOkej=false;
  PotvrdiSifru() {
      this.Auth2FOtkljucajRequest.username=this.korisnickoIme;
    this.Auth2FOtkljucajRequest.kljuc=this.kljuc;
      console.log(this.Auth2FOtkljucajRequest);
      this.mailService.OtkljucajAuth(this.Auth2FOtkljucajRequest).subscribe(response=>{
        window.localStorage.setItem("my-auth-token", JSON.stringify(response));
        this.router.navigate(["/pregledKorisnikaDoma"])
      },(error)=>{
            this.verifikacijaNijeOkej=true;
      });
  }
}
