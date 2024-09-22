import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DoktorGetAllResponse, DoktorGetAllResponseDoktor} from "../doktor/doktorGetAllResponse";
import {MyConfig} from "../my-config";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {
  ProvjeraPasswordaRequest,
  ProvjeraPasswordaResponse
} from "../pregled-podataka-njegovatelj/provjeraPasswordaResponse";
import {NavBarNjejgovateljComponent} from "../nav-bar-njejgovatelj/nav-bar-njejgovatelj.component";
import {NavBarDoktorComponent} from "../nav-bar-doktor/nav-bar-doktor.component";


@Component({
  selector: 'app-pregled-podataka-doktor',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, NavBarNjejgovateljComponent, NavBarDoktorComponent],
  templateUrl: './pregled-podataka-doktor.component.html',
  styleUrl: './pregled-podataka-doktor.component.css'
})

export class PregledPodatakaDoktorComponent implements OnInit{

  public allDoktori:DoktorGetAllResponseDoktor[]=[];
  public doktor:DoktorGetAllResponseDoktor | null=null
  public korisnickiNalog:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  public prikaziDialog:boolean=false;
  public staraLozinka:string="";
  public novaLozinka:string="";
  public novaLozinkaPotvrda:string="";
  public novoKorisnickoIme:string="";
  emptyKorIme:boolean=false;
  uspjesnoPromijenjeniPodaci: boolean=false;
  constructor(public httpClient:HttpClient)
  {
  }
  ngOnInit(): void {
       this.getDoktorPodaci();
    }

  public requestLozinka:ProvjeraPasswordaRequest={
    korisnickiNalogId:0,
    lozinka:""
  }
  getDoktorPodaci() {
    let url: string = MyConfig.adresa_servera + `/doktor-getAll`;
    this.httpClient.get<DoktorGetAllResponse>(url).subscribe(x => {
      this.allDoktori = x.doktori;
      this.doktor=this.allDoktori.find(x=>x.zaposlenikId==this.getDoktor()?.zaposlenikId) || null;
      this.getKorisnickiNalog();
    })
  }
  getDoktor():DoktorGetAllResponseDoktor | null {
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
        nalog=>nalog.nalogId===this.doktor?.nalogId) || null;
    })
  }
  showErrorNePostojiNalog:boolean=false
  showPromijeniLozinku:boolean=false;
  showProvjeraLozinkeZaLozinku:boolean=false;
  showProvjeraLozinkeZaNalog:boolean=false;
  showPromijeniNalog:boolean=false;
  ProvjeriLozinku(){
    let url: string = MyConfig.adresa_servera + `/provjeraPassworda`;
    this.requestLozinka.korisnickiNalogId=this.getDoktor()?.nalogId || 0;
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
        this.uspjesnoPromijenjeniPodaci=true;
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
    this.ProvjeraIPromjenaLozinke();
    this.ngOnInit();
  }

  Otkazi() {
    this.prikaziDialog=false;
    this.SveFalse();
  }
}
