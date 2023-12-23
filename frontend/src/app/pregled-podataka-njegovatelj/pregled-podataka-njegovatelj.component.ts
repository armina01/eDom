import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {
  GetAllNjegovateljaResponseNjegovatelj,
  GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {HttpClient} from "@angular/common/http";
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

@Component({
  selector: 'app-pregled-podataka-njegovatelj',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pregled-podataka-njegovatelj.component.html',
  styleUrl: './pregled-podataka-njegovatelj.component.css'
})
export class PregledPodatakaNjegovateljComponent {

  constructor(public httpClient:HttpClient,private dialog: MatDialog)
  {}
  public prikaziDialog:boolean=false;
  public staraLozinka:string="";
  public novaLozinka:string="";
  ngOnInit(){
    this.GetPodatkeZaposlenika();
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
    let url: string = MyConfig.adresa_servera + `/getAllNjegovatelji`;
    this.httpClient.get<GetAllNjegovateljiResponse>(url).subscribe(x => {
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
    let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
      this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url).subscribe(x => {

        this.poslovnaPozicija = x.poslovnePozicije.find(pozicija=>
            pozicija.poslovnaPozicijaId===this.njegovatelj?.poslovnaPozicijaId) || null;
      })
  }
  public korisnickiNalog:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  public korisnickiNalogProvjera:GetAllKorisnickiNalogResponseKorisnickiNalog|null=null;
  GetAllKorisnickiNalog(): void {
    let url: string = MyConfig.adresa_servera + `/get-all-KorisnickiNalog`;
    this.httpClient.get<GetAllKorisnickiNalogResponse>(url).subscribe(x => {

      this.korisnickiNalog = x.korisnickiNalozi.find(
          nalog=>nalog.nalogId===this.njegovatelj?.nalogId) || null;
    })
  }
 showErrorNePostojiNalog:boolean=false
  showPromijeniLozinku:boolean=false;
  showProvjeraLozinke:boolean=false
  ProvjeriLozinku(){
    let url: string = MyConfig.adresa_servera + `/get-all-KorisnickiNalog`;
    this.httpClient.get<GetAllKorisnickiNalogResponse>(url).subscribe(x => {

      this.korisnickiNalogProvjera = x.korisnickiNalozi.find(
          nalog=>nalog.nalogId===this.njegovatelj?.nalogId) || null;
      if(this.korisnickiNalogProvjera===null)
      {
        this.showErrorNePostojiNalog=true;
      }
      else{
        this.showErrorNePostojiNalog=false;
        this.showPromijeniLozinku=true;
      }
    })
  }

  PromijeniLozinku() {
    this.prikaziDialog=true;
  }
}
