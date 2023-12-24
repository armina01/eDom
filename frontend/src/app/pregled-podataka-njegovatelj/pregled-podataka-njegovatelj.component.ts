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
import {ProvjeraPasswordaRequest, ProvjeraPasswordaResponse} from "./provjeraPasswordaResponse";

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
    let url: string = MyConfig.adresa_servera + `/provjeraPassworda`;
    this.requestLozinka.korisnickiNalogId=this.getNjegovatelj()?.nalogId || 0;
    this.requestLozinka.lozinka=this.staraLozinka;
    this.httpClient.post<ProvjeraPasswordaResponse>(url,this.requestLozinka).subscribe(response => {
      console.log("Response",response.jeIspravno);
      if(response.jeIspravno)
        {
          this.showPromijeniLozinku=true;
          this.showErrorNePostojiNalog=false;
        }
        else{
          this.showErrorNePostojiNalog=true;
        this.showPromijeniLozinku=false;
        }
    })
  }

  PromijeniLozinku() {
    this.prikaziDialog=true;
  }

  ProvjeraIPromjenaLozinke() {
    if(this.novaLozinka===this.novaLozinkaPotvrda && this.korisnickiNalog)
    {
      this.korisnickiNalog.lozinka=this.novaLozinka;
      let url: string = MyConfig.adresa_servera + `/updateNaloga`;
      this.httpClient.post(url,this.korisnickiNalog).subscribe(x => {
            console.log("Uspjesno promijenjeno")
      })
    }
  }
}
