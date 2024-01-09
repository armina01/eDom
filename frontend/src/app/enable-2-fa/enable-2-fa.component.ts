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

@Component({
  selector: 'app-enable-2-fa',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  public korisnickiNalog:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  public enable2FAuthRequest: Enable2FAuthRequest ={
    nalogId:0
  }
  public sifra="";
  public Auth2FOtkljucajRequest: Auth2FOtkljucajRequest ={
      kljuc:""
  }
  PosaljiMail() {
        this.korisnickiNalogService.GetAllKorisnickiNalog().subscribe(response=>
        {
          console.log(this.korisnickoIme);
          this.korisnickiNalog=response.korisnickiNalozi.find(x=>x.korisnickoIme===this.korisnickoIme)||null;
          console.log("Korisnicki nalog",this.korisnickiNalog)
          this.enable2FAuthRequest.nalogId=this.korisnickiNalog?.nalogId??0;
          this.mailService.PosaljiMail(this.enable2FAuthRequest).subscribe();

        });
  }

  PotvrdiSifru() {
      this.mailService.OtkljucajAuth(this.Auth2FOtkljucajRequest).subscribe(()=>{
        this.router.navigate(["/home"])
      });
  }
}
