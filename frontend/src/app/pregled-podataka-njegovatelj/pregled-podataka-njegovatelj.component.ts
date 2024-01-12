import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {
  GetAllNjegovateljaResponseNjegovatelj,
  GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {MatDialog} from "@angular/material/dialog";
import {ProvjeraPasswordaRequest, ProvjeraPasswordaResponse} from "./provjeraPasswordaResponse";
import {NjegovateljiService} from "../Services/NjegovateljService";
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";
import {PoslovnaPozicijaService} from "../Services/PoslovnaPozicijaService";
import {PasswordService} from "../Services/PasswordService";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-pregled-podataka-njegovatelj',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  providers: [NjegovateljiService,KorisnickiNalogService,PoslovnaPozicijaService,PasswordService],
  templateUrl: './pregled-podataka-njegovatelj.component.html',
  styleUrl: './pregled-podataka-njegovatelj.component.css'
})
export class PregledPodatakaNjegovateljComponent {

  constructor(public httpClient:HttpClient,private dialog: MatDialog,
              private njegovateljService:NjegovateljiService, private korisnickiNalogService:KorisnickiNalogService,
              private poslovnaPozicijaService:PoslovnaPozicijaService,
              private passwordService:PasswordService)
  {}
  public novoKorisnickoIme:string="";
  public prikaziDialog:boolean=false;
  public staraLozinka:string="";
  public novaLozinka:string="";
  public novaLozinkaPotvrda:string="";
  ngOnInit(){
    this.GetPodatkeZaposlenika();
  }
  public requestLozinka:ProvjeraPasswordaRequest={
    korisnickiNalogId:0,
    lozinka:""
  }
  public allNjegovatelji:GetAllNjegovateljaResponseNjegovatelj[]=[];
  public njegovatelj:GetAllNjegovateljaResponseNjegovatelj|null=null
  getNjegovatelj():GetAllNjegovateljaResponseNjegovatelj | null {
    let korisnik = window.localStorage.getItem("korisnik")??"";
    try {
      return JSON.parse(korisnik);
    }
    catch (e){
      return null;
    }
  }
  GetPodatkeZaposlenika()
  {
    this.njegovateljService.GetAllNjegovatelji().subscribe(x => {
      this.allNjegovatelji = x.njegovatelji;
      this.njegovatelj=this.allNjegovatelji.find(njegovatelj=>
          njegovatelj.zaposlenikId===this.getNjegovatelj()?.zaposlenikId) ||null;
      this.GetVrstaNjegovatelja();
      this.GetPoslovnaPozicija();
      this.GetAllKorisnickiNalog();
    })
  }
  public vrstaNjegovatelja:string="";
  GetVrstaNjegovatelja(){
    if(this.njegovatelj?.isNjegovatelj)
    {
      this.vrstaNjegovatelja="Njegovatelj";
    }
    else if(this.njegovatelj?.isMedicinskiTehnicar)
    {
      this.vrstaNjegovatelja="Njegovatelj";
    }
  }
  public poslovnaPozicija:GetAllPoslovnaPozicijaResponsePoslovnaPozicija|null=null;
  GetPoslovnaPozicija(){
    this.poslovnaPozicijaService.GetAllPoslovnaPozicija().subscribe(x => {

        this.poslovnaPozicija = x.poslovnePozicije.find(pozicija=>
            pozicija.poslovnaPozicijaId===this.njegovatelj?.poslovnaPozicijaId) || null;
      })
  }
  public korisnickiNalog:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  GetAllKorisnickiNalog(): void {
    this.korisnickiNalogService.GetAllKorisnickiNalog().subscribe(x => {

      this.korisnickiNalog = x.korisnickiNalozi.find(
          nalog=>nalog.nalogId===this.njegovatelj?.nalogId) || null;
    })
  }
 showErrorNePostojiNalog:boolean=false
  showPromijeniLozinku:boolean=false;
  showProvjeraLozinkeZaLozinku:boolean=false;
  showProvjeraLozinkeZaNalog:boolean=false;
  showPromijeniNalog:boolean=false
  ProvjeriLozinku(){

    this.requestLozinka.korisnickiNalogId=this.getNjegovatelj()?.nalogId || 0;
    this.requestLozinka.lozinka=this.staraLozinka;
    console.log(this.staraLozinka)
    this.passwordService.ProvjeriPassword(this.requestLozinka).subscribe(response => {

      if(response.jeIspravno)
      {
        this.showErrorNePostojiNalog=false;
        console.log(this.showProvjeraLozinkeZaLozinku);
        if(this.showProvjeraLozinkeZaLozinku) {
          this.showPromijeniLozinku=true;
        }
        else if(this.showProvjeraLozinkeZaNalog)
        {
          this.showPromijeniNalog=true;
        }

      }
        else{
          this.showErrorNePostojiNalog=true;
        this.showPromijeniLozinku=false;
        }
    })
  }

  PromijeniLozinku() {
    this.prikaziDialog=true;
    this.showProvjeraLozinkeZaLozinku=true;
    this.showPromijeniLozinku=false;
    this.showPromijeniNalog=false;
    this.showProvjeraLozinkeZaNalog=false;
  }

  lozicnkeNotMatching:boolean=false;
  emptyKorIme:boolean=false;
  uspjesnoPromijenjeniPodaci: boolean=false;
  ProvjeraIPromjenaLozinke() {

    if(this.showProvjeraLozinkeZaLozinku) {
      if (this.novaLozinka === this.novaLozinkaPotvrda && this.korisnickiNalog) {
        this.lozicnkeNotMatching=false;
        this.korisnickiNalog.lozinka = this.novaLozinka;
        this.korisnickiNalogService.UpdateKorisnickiNalog(this.korisnickiNalog).subscribe(x => {})
        this.uspjesnoPromijenjeniPodaci=true;
        this.SveFalse();

      }
      else{
        this.lozicnkeNotMatching=true;
      }
    }
    else if(this.showProvjeraLozinkeZaNalog)
    {
      if(this.novoKorisnickoIme!=="" && this.korisnickiNalog)
      {
        this.korisnickiNalog.korisnickoIme=this.novoKorisnickoIme;
        this.korisnickiNalogService.UpdateKorisnickiNalog(this.korisnickiNalog).subscribe(x => {})
        this.SveFalse();
      }
      else {
        this.emptyKorIme=true;
      }
    }
  }
  SveFalse(){
    this.showProvjeraLozinkeZaNalog=false;
    this.showProvjeraLozinkeZaLozinku=false;
    this.showPromijeniLozinku=false;
    this.showErrorNePostojiNalog=false;
    this.showErrorNePostojiNalog=false
    this.showPromijeniLozinku=false;
    this.showProvjeraLozinkeZaLozinku=false;
    this.showProvjeraLozinkeZaNalog=false;
    this.showPromijeniNalog=false;
    this.emptyKorIme=false;
    this.lozicnkeNotMatching=false;
  }
  PromijeniKorisnickoIme() {
    this.prikaziDialog=true;
    this.showProvjeraLozinkeZaNalog=true;
    this.showProvjeraLozinkeZaLozinku=false;
    this.ProvjeraIPromjenaLozinke();
    this.ngOnInit();
  }

  Otkazi() {
    this.prikaziDialog=false;
    this.SveFalse();
  }

  PromijeniKorIme() {
    this.showProvjeraLozinkeZaNalog=true;
    this.showPromijeniNalog=false;
    this.prikaziDialog=true;
    this.showProvjeraLozinkeZaLozinku=false;
    this.showPromijeniLozinku=false;
  }
}
