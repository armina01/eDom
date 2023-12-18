import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {GetAllKorisnickiNalogResponse} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {HttpClient} from "@angular/common/http";
import {GetAllZadatakResponse, GetAllZadatakResponseZadatak} from "./getAllZadaciResponse";
import {DodajZadatakRequest} from "./dodajZadatakRequest";
import {MY_AUTH_SERVICE_TOKEN, MyAuthService} from "../Services/MyAuthService";
import {KorisnickiNalogFetch} from "../Services/GetAllKorisnickiNalog";
import {NjegovateljiFetch} from "../Services/NjegovateljFetch";
import {AutentifikacijaToken} from "../Helper/autentifikacijToken";
import {GetAllZaposlenikResponseZaposlenik} from "../Services/getAllZaposleniciResponse";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-get-zadaci',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './get-zadaci.component.html',
  styleUrl: './get-zadaci.component.css'
})
export class GetZadaciComponent {

  constructor(public httpClient: HttpClient,@Inject(MY_AUTH_SERVICE_TOKEN) private _myAuthService: MyAuthService) {
  }
  showOpsti:boolean=false;
  showFizijatrijski=false;
  showMedicinski=false;
  public njegovatelj:GetAllNjegovateljaResponseNjegovatelj|null=null;
  public medicinskiZadatak: GetAllZadatakResponseZadatak[]=[];
  public opstiZadatak: GetAllZadatakResponseZadatak[]=[];
  public fizijatrijskiZadatak: GetAllZadatakResponseZadatak[]=[];
  public zadaci:GetAllZadatakResponseZadatak[]=[];
  public korisnickiNalog=this._myAuthService.getAuthorizationToken()?.korisnickiNalog
  public dodajOpstiZadatak:DodajZadatakRequest={
    opis:"",
    status:false,
    datumPostavke:new Date(),
    zaposlenikPostavioId: 0,
      zaposlenikEditovaoId:null,
      intervalZadatkaId:1,
      vrstaZadatkaId:6
  }
  GetAllMedicinskiZadaci() {
    this.medicinskiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===4)
    this.showOpsti=false;
    this.showFizijatrijski=false;
    this.showMedicinski=true;
  }
  GetAllFizijatrijskiZadaci() {
    this.fizijatrijskiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===5)
    this.showOpsti=false;
    this.showFizijatrijski=true;
    this.showMedicinski=false;
  }
  GetAllOpstiZadaci() {
    this.opstiZadatak= this.zadaci.filter(x=>x.vrstaZadatkaId===6)
    this.showOpsti=true;
    this.showFizijatrijski=false;
    this.showMedicinski=false;
  }
  ngOnInit(){
    this.GetAllZadaci();
    this.njegovatelj=this.getZaposlenik();

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
  GetAllZadaci() {
    let url: string = MyConfig.adresa_servera + `/getAllZadatak`;
    this.httpClient.get<GetAllZadatakResponse>(url).subscribe(x => {
      this.zadaci = x.zadaci.filter(x=>x.intervalZadatkaId===1)
    })
  }
  getAllMedicinskizadaci(){
    return this.medicinskiZadatak
  }
  getAllOpstizadaci(){
    return this.opstiZadatak
  }
  getAllFizijatrijskizadaci(){
    return this.fizijatrijskiZadatak
  }
  showDodajOpstiZadatak=false
  PrikaziDodajOpstiZadatak() {
    this.showDodajOpstiZadatak=true;
  }
  DodajOpstiZadatak()
  {
    this.dodajOpstiZadatak.zaposlenikPostavioId=this.njegovatelj?.zaposlenikId??null;
    this.DodajZadatak(this.dodajOpstiZadatak);
  }
  DodajZadatak(data:DodajZadatakRequest){
      let url: string = MyConfig.adresa_servera + `/dodajZadatak`;
      this.httpClient.post(url, data).subscribe(request => {})
  }

}
