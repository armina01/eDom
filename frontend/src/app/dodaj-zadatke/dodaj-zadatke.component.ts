import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MyConfig} from "../my-config";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {HttpClient} from "@angular/common/http";
import {DodajZadatakRequest} from "../get-zadaci/dodajZadatakRequest";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";
import {DodajZadatakResponse} from "../get-zadaci/DodajZadatakResponse";
import {SelectKorisnikeDoma} from "./SelectKorisnikeDoma";

@Component({
  selector: 'app-dodaj-zadatke',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './dodaj-zadatke.component.html',
  styleUrl: './dodaj-zadatke.component.css'
})
export class DodajZadatkeComponent {

  constructor(public httpClient:HttpClient) {
  }

  public _showKorisnici:SelectKorisnikeDoma[]=[];
  korisnici:KorisnikDomaGetAllResponseKorisnik[]=[];
  public dodajOpstiZadatak:DodajZadatakRequest={
    opis:"",
    status:false,
    datumPostavke:new Date(),
    zaposlenikPostavioId: 0,
    zaposlenikEditovaoId:null,
    intervalZadatkaId:0,
    vrstaZadatkaId:6,
    korisnikDomaId:0
  }

  public njegovatelj:GetAllNjegovateljaResponseNjegovatelj|null=null;
  ngOnInit(){
  this.GetAllKorisnici();

    this.njegovatelj=this.getZaposlenik();
  }
  GetAllKorisnici(){
    let url =MyConfig.adresa_servera +`/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x:KorisnikDomaGetAllResponse)=>{
      this.korisnici = x.korisnici;
      this.ShowAllKorisnici();
    })

  }

  ShowAllKorisnici(){
    console.log(this.korisnici)
    this.korisnici.forEach(x => {
      let _selectedKorisnikDoma: SelectKorisnikeDoma = {
        selected: false,
        korisnikDomaID: x.korisnikDomaID,
        imePrezime: x.imePrezime,
        jmbg: x.jmbg,
        datumRodjenja: x.datumRodjenja,
        brojSobe: x.brojSobe,
      };
      this._showKorisnici.push(_selectedKorisnikDoma);
    });
  }
  getKorisnici() {
      return this._showKorisnici;
  }

  public _vrstaDnevnogZadatkaId:boolean=false;
  public _vrstaSedmicnogZadatkaId:boolean=false;
  public showErrorNijeIzabrano:boolean=false;
  public showErrorObojeIzabrano:boolean=false;
  public showErrorPrazno:boolean=false;
  DodajZadatak() {
    if(this._vrstaDnevnogZadatkaId===this._vrstaSedmicnogZadatkaId)
    {
      if(this._vrstaDnevnogZadatkaId===true) {
        this.showErrorObojeIzabrano = true;
        this.showErrorNijeIzabrano = false;
      }
      else {
        this.showErrorNijeIzabrano=true
        this.showErrorObojeIzabrano=false;
      }
    }
    else
    {
      if(this.dodajOpstiZadatak.opis==="" )
      {
        this.showErrorObojeIzabrano = false;
        this.showErrorNijeIzabrano = false;
        this.showErrorPrazno=true;
      }
      else {
        let selectedKorisnici=this._showKorisnici.filter(x=>x.selected===true)

        selectedKorisnici.forEach(korisnik=> {

              this.AddZadatak(korisnik);
            }
        );
        this.showErrorNijeIzabrano=false;
        this.showErrorObojeIzabrano=false;
        this.dodajOpstiZadatak.opis="";
        this.dodajOpstiZadatak.status=false;
      }
    }
  }
  getZaposlenik():GetAllNjegovateljaResponseNjegovatelj | null {
    let korisnik = window.localStorage.getItem("korisnik")??"";
    try {
      return JSON.parse(korisnik);
    }
    catch (e){
      return null;
    }
  }
  private AddZadatak(korisnik: SelectKorisnikeDoma) {
    this.dodajOpstiZadatak.zaposlenikPostavioId=this.njegovatelj?.zaposlenikId??0;
    this.dodajOpstiZadatak.korisnikDomaId=korisnik.korisnikDomaID;
    this.dodajOpstiZadatak.intervalZadatkaId= this._vrstaDnevnogZadatkaId?1:2;
    let url: string = MyConfig.adresa_servera + `/dodajZadatak`;
    this.httpClient.post<DodajZadatakResponse>(url, this.dodajOpstiZadatak).subscribe((response:DodajZadatakResponse) => {

    })
  }
  public isSelected:boolean=true
  SelectAll() {
    this._showKorisnici.forEach(x=>x.selected=this.isSelected)
    this.isSelected=false;
  }
}
