import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {HttpClient} from "@angular/common/http";
import {
  ProvjeraPasswordaRequest,
  ProvjeraPasswordaResponse
} from "../pregled-podataka-njegovatelj/provjeraPasswordaResponse";
import {MyConfig} from "../my-config";
import {
  FizioterapeutGetAllResponse,
  FizioterapeutGetAllResponseFizioterapeut
} from "../fizioterapeut/fizioterapeutGetAll";
import {NavBarFizioterapeutComponent} from "../nav-bar-fizioterapeut/nav-bar-fizioterapeut.component";

@Component({
  selector: 'app-pregled-podataka-fizioterapeut',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavBarFizioterapeutComponent],
  templateUrl: './pregled-podataka-fizioterapeut.component.html',
  styleUrl: './pregled-podataka-fizioterapeut.component.css'
})
export class PregledPodatakaFizioterapeutComponent implements OnInit{

  public allFizioterapeuti:FizioterapeutGetAllResponseFizioterapeut[]=[];
  public fizioterapeut: FizioterapeutGetAllResponseFizioterapeut | null=null
  public korisnickiNalog:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  public prikaziDialog:boolean=false;
  public staraLozinka:string="";
  public novaLozinka:string="";
  public novaLozinkaPotvrda:string="";
  public novoKorisnickoIme:string="";
  constructor(public httpClient:HttpClient)
  {
  }

  ngOnInit(): void {
    this.getFizioterapeutPodaci();
    }


  public requestLozinka:ProvjeraPasswordaRequest={
    korisnickiNalogId:0,
    lozinka:""
  }
  getFizioterapeutPodaci() {
    let url: string = MyConfig.adresa_servera + `/fizioterapeut-getAll`;
    this.httpClient.get<FizioterapeutGetAllResponse>(url).subscribe(x => {
      this.allFizioterapeuti= x.fizioterapeuti

      this.fizioterapeut=this.allFizioterapeuti.find(x=>x.zaposlenikId==this.getFizioterapeut()?.zaposlenikId) || null;
      this.getKorisnickiNalog();
    })
  }
  getFizioterapeut():FizioterapeutGetAllResponseFizioterapeut | null {
    let korisnik = window.localStorage.getItem("korisnik")??"";
    try {
      return JSON.parse(korisnik);
    }
    catch (e){
      return null;
    }
  }

  getKorisnickiNalog(): void {
    let url: string = MyConfig.adresa_servera + `/get-all-KorisnickiNalog`;
    this.httpClient.get<GetAllKorisnickiNalogResponse>(url).subscribe(x => {

      this.korisnickiNalog = x.korisnickiNalozi.find(
        nalog=>nalog.nalogId===this.fizioterapeut?.nalogId) || null;
    })
  }
  showErrorNePostojiNalog:boolean=false
  showPromijeniLozinku:boolean=false;
  showProvjeraLozinkeZaLozinku:boolean=false;
  showProvjeraLozinkeZaNalog:boolean=false;
  showPromijeniNalog:boolean=false;

  ProvjeriLozinku(){
    let url: string = MyConfig.adresa_servera + `/provjeraPassworda`;
    this.requestLozinka.korisnickiNalogId=this.getFizioterapeut()?.nalogId || 0;
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
  emptyKorisnickoIme:boolean=false;
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
        this.prikaziDialog=false;
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
        this.korisnickiNalog.lozinka=this.staraLozinka;
        console.log(this.korisnickiNalog);
        let url: string = MyConfig.adresa_servera + `/updateNaloga`;
        this.httpClient.post(url, this.korisnickiNalog).subscribe(x => {
          console.log("Uspjesno promijenjeno")
        })
        this.SveFalse();
        this.prikaziDialog=false;
      }
      else {
        this.emptyKorisnickoIme=true;
      }
    }
  }
  SveFalse(){
    this.showProvjeraLozinkeZaNalog=false;
    this.showProvjeraLozinkeZaLozinku=false;
    this.showPromijeniLozinku=false;
    this.showErrorNePostojiNalog=false
    this.showPromijeniNalog=false;
    this.emptyKorisnickoIme=false;
    this.lozicnkeNotMatching=false;
  }
  PromijeniKorisnickoIme() {
    this.prikaziDialog=true;
    this.showProvjeraLozinkeZaNalog=true;
    this.showProvjeraLozinkeZaLozinku=false;

  }

  Otkazi() {
    this.prikaziDialog=false;
    this.SveFalse();
  }
}
