import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {
  ProvjeraPasswordaRequest,
  ProvjeraPasswordaResponse
} from "../pregled-podataka-njegovatelj/provjeraPasswordaResponse";
import {
  GetAllNjegovateljaResponseNjegovatelj,
  GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {MyConfig} from "../my-config";
import {
  GetAllPoslovnaPozicijaResponse,
  GetAllPoslovnaPozicijaResponsePoslovnaPozicija
} from "../poslovna-pozicija/getAllPoslovnaPozicija";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  GetAllNutricionistaResponseNutricionista,
  GetAllNutricionisteResponse
} from "../nutricionista/getAllNutricionisteResponse";
import {NjegovateljiService} from "../Services/NjegovateljService";
import {KorisnickiNalogService} from "../Services/KorisnickiNalogService";
import {PoslovnaPozicijaService} from "../Services/PoslovnaPozicijaService";
import {PasswordService} from "../Services/PasswordService";
import {NutricionistaService} from "../Services/NutricionistaService";
import {NavBarNutricionistaComponent} from "../nav-bar-nutricionista/nav-bar-nutricionista.component";

@Component({
  selector: 'app-pregled-podataka-nutricionista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,NavBarNutricionistaComponent],
  providers: [NutricionistaService,KorisnickiNalogService,PoslovnaPozicijaService,PasswordService],
  templateUrl: './pregled-podataka-nutricionista.component.html',
  styleUrl: './pregled-podataka-nutricionista.component.css'
})
export class PregledPodatakaNutricionistaComponent {

  constructor(public httpClient:HttpClient,private dialog: MatDialog,
              private nutricionistaService:NutricionistaService, private korisnickiNalogService:KorisnickiNalogService,
              private poslovnaPozicijaService:PoslovnaPozicijaService,
              private passwordService:PasswordService)
  {}
  public prikaziDialog:boolean=false;
  public staraLozinka:string="";
  public novaLozinka:string="";
  public novaLozinkaPotvrda:string="";
  public novoKorisnickoIme:string="";
  ngOnInit(){
    this.GetPodatkeZaposlenika();
  }
  public requestLozinka:ProvjeraPasswordaRequest={
    korisnickiNalogId:0,
    lozinka:""
  }
  public allNutricionisti:GetAllNutricionistaResponseNutricionista[]=[];
  public nutricionista:GetAllNutricionistaResponseNutricionista|null=null
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
    this.nutricionistaService.GetAllNutricionisti().subscribe(x => {
      this.allNutricionisti = x.nutricionisti;
      this.nutricionista=this.allNutricionisti.find(nutri=>
          nutri.zaposlenikId===this.getNjegovatelj()?.zaposlenikId) ||null;

      this.GetPoslovnaPozicija();
      this.GetAllKorisnickiNalog();
    })
  }

  public poslovnaPozicija:GetAllPoslovnaPozicijaResponsePoslovnaPozicija|null=null;
  GetPoslovnaPozicija(){
    this.poslovnaPozicijaService.GetAllPoslovnaPozicija().subscribe(x => {
      this.poslovnaPozicija = x.poslovnePozicije.find(pozicija=>
          pozicija.poslovnaPozicijaId===this.nutricionista?.poslovnaPozicijaId) || null;
    })
  }
  public korisnickiNalog:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  GetAllKorisnickiNalog(): void {
    this.korisnickiNalogService.GetAllKorisnickiNalog().subscribe(x => {

      this.korisnickiNalog = x.korisnickiNalozi.find(
          nalog=>nalog.nalogId===this.nutricionista?.nalogId) || null;
    })
  }
  showErrorNePostojiNalog:boolean=false
  showPromijeniLozinku:boolean=false;
  showProvjeraLozinkeZaLozinku:boolean=false;
  showProvjeraLozinkeZaNalog:boolean=false;
  showPromijeniNalog:boolean=false;
  ProvjeriLozinku(){
    this.requestLozinka.korisnickiNalogId=this.getNjegovatelj()?.nalogId || 0;
    this.requestLozinka.lozinka=this.staraLozinka;
    this.passwordService.ProvjeriPassword(this.requestLozinka).subscribe(response => {
      console.log("Response",response.jeIspravno);
      if(response.jeIspravno)
      {
        this.showErrorNePostojiNalog=false;
        if(this.showProvjeraLozinkeZaLozinku) {
          this.showPromijeniLozinku=true;
        }
        else if(this.showProvjeraLozinkeZaNalog)
        {
          this.showPromijeniNalog=true;
        }

      }
      else{
        this.showPromijeniLozinku=false;
        this.showErrorNePostojiNalog=true;

      }
    })
  }

  PromijeniLozinku() {
    this.prikaziDialog=true;
    this.showProvjeraLozinkeZaNalog=false;
    this.showProvjeraLozinkeZaLozinku=true;
  }
  lozicnkeNotMatching:boolean=false;
  emptyKorIme:boolean=false;
  ProvjeraIPromjenaLozinke() {

    if(this.showProvjeraLozinkeZaLozinku) {
      if (this.novaLozinka === this.novaLozinkaPotvrda && this.korisnickiNalog) {
        this.lozicnkeNotMatching=false;
        this.korisnickiNalog.lozinka = this.novaLozinka;
        this.korisnickiNalogService.UpdateKorisnickiNalog(this.korisnickiNalog).subscribe(x => {
          console.log("Uspjesno promijenjeno")
        })
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
         this.korisnickiNalogService.UpdateKorisnickiNalog(this.korisnickiNalog).subscribe(x => {
           console.log("Uspjesno promijenjeno")
         })
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
