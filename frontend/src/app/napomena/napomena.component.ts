import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NapomenaDodajRequest} from "./napomenaDodajRequest";
import {MyConfig} from "../my-config";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {VrstaNapomeneGetAllResponse, VrstaNapomeneGetAllResponseVrstaNapomene} from "./vrstaNapomeneGetAllResponse";
import {OdabraniKorisnikDoma} from "./odabraniKorisnikDoma";

@Component({
  selector: 'app-napomena',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './napomena.component.html',
  styleUrl: './napomena.component.css'
})
export class NapomenaComponent implements OnInit{

  public korisniciDoma: KorisnikDomaGetAllResponseKorisnik[] = [];
  public vrsteNapomena:VrstaNapomeneGetAllResponseVrstaNapomene[]=[];
  public prikazaniKorisniciDoma:  OdabraniKorisnikDoma[] = [];
    ngOnInit(): void {
      this.getVrsteNapomene();
      this.getAllKorisnici();
    }
    constructor(public httpClient: HttpClient,private dialog: MatDialog) {
    }

    public napomenaDodajRequest:NapomenaDodajRequest={
      opis:"",
      datumPostavke:new Date(),
      prioritet:false,
      zaposlenikId:0,
      korisnikDomaID:0,
      vrstaNapomeneId:1
    }

  getAllKorisnici() {
    let url = MyConfig.adresa_servera + `/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x: KorisnikDomaGetAllResponse) => {
      this.korisniciDoma = x.korisnici;
      this.PrikaziKorisnikeDoma();
    })
  }

  getVrsteNapomene() {
    let url = MyConfig.adresa_servera + `/vrstaNapomene/getAll`
    this.httpClient.get<VrstaNapomeneGetAllResponse>(url).subscribe((x: VrstaNapomeneGetAllResponse) => {
      this.vrsteNapomena=x.vrsteNapomena;
    })
  }

  PrikaziKorisnikeDoma(){
    console.log(this.korisniciDoma)
    this.korisniciDoma.forEach(x => {
      let odabraniKorisnikDoma: OdabraniKorisnikDoma = {
        selected: false,
        korisnikDomaID: x.korisnikDomaID,
        imePrezime: x.imePrezime,
        jmbg: x.jmbg,
        datumRodjenja: x.datumRodjenja,
        brojSobe: x.brojSobe,
      };
      this.prikazaniKorisniciDoma.push(odabraniKorisnikDoma);
    });
  }
  getKorisnici() {
    return this.prikazaniKorisniciDoma;
  }

  NapomenaPost(korisnik: OdabraniKorisnikDoma) {

    let url=MyConfig.adresa_servera + `/napomena/dodaj`;
    this.napomenaDodajRequest.korisnikDomaID = korisnik.korisnikDomaID;
    console.log(this.napomenaDodajRequest);
    this.httpClient.post(url, this.napomenaDodajRequest).subscribe(response=>{
      console.log("Napomena uspjesno dodana");
    });
    korisnik.selected=false;
    this.napomenaDodajRequest.prioritet=false;
  }

  Dodaj() {
    let selectedKorisnici=this.prikazaniKorisniciDoma.filter(x=>x.selected===true)
    selectedKorisnici.forEach(korisnik=> {
        this.NapomenaPost(korisnik);
      }
    );
  }
}
