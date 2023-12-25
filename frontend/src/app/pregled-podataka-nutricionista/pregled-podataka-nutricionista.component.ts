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

@Component({
  selector: 'app-pregled-podataka-nutricionista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pregled-podataka-nutricionista.component.html',
  styleUrl: './pregled-podataka-nutricionista.component.css'
})
export class PregledPodatakaNutricionistaComponent {

  constructor(public httpClient:HttpClient,private dialog: MatDialog)
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
    let url: string = MyConfig.adresa_servera + `/getAllNutricioniste`;
    this.httpClient.get<GetAllNutricionisteResponse>(url).subscribe(x => {
      this.allNutricionisti = x.nutricionisti;
      this.nutricionista=this.allNutricionisti.find(nutri=>
          nutri.zaposlenikId===this.getNjegovatelj()?.zaposlenikId) ||null;

      this.GetPoslovnaPozicija();
      this.GetAllKorisnickiNalog();
    })
  }
  public vrstaNjegovatelja:string="";

  public poslovnaPozicija:GetAllPoslovnaPozicijaResponsePoslovnaPozicija|null=null;
  GetPoslovnaPozicija(){
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
    this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).subscribe(x => {

      this.poslovnaPozicija = x.poslovnePozicije.find(pozicija=>
          pozicija.poslovnaPozicijaId===this.nutricionista?.poslovnaPozicijaId) || null;
    })
  }
  public korisnickiNalog:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  GetAllKorisnickiNalog(): void {
    let url: string = MyConfig.adresa_servera + `/get-all-KorisnickiNalog`;
    this.httpClient.get<GetAllKorisnickiNalogResponse>(url).subscribe(x => {

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
    let url: string = MyConfig.adresa_servera + `/provjeraPassworda`;
    this.requestLozinka.korisnickiNalogId=this.getNjegovatelj()?.nalogId || 0;
    this.requestLozinka.lozinka=this.staraLozinka;
    this.httpClient.post<ProvjeraPasswordaResponse>(url,this.requestLozinka).subscribe(response => {
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
        let url: string = MyConfig.adresa_servera + `/updateNaloga`;
        this.httpClient.post(url, this.korisnickiNalog).subscribe(x => {
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
         let url: string = MyConfig.adresa_servera + `/updateNaloga`;
         this.httpClient.post(url, this.korisnickiNalog).subscribe(x => {
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
}
