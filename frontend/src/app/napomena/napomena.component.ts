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
import {KorisnikDomaService} from "../Services/KorisnikDomaService";
import {NapomenaService} from "../Services/NapomenaService";

@Component({
  selector: 'app-napomena',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers:[KorisnikDomaService, NapomenaService],
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
    constructor(public httpClient: HttpClient,private dialog: MatDialog, private korisnikDomaService:KorisnikDomaService, private napomenaService: NapomenaService) {
    }

    public napomenaDodajRequest:NapomenaDodajRequest={
      opis:"",
      datumPostavke:new Date(),
      isAktivna:false,
      prioritet:false,
      zaposlenikId:0,
      korisnikDomaID:0,
      vrstaNapomeneId:1
    }

  getAllKorisnici() {
    this.korisnikDomaService.GetAllKorisnici().subscribe((x: KorisnikDomaGetAllResponse) => {
      this.korisniciDoma = x.korisnici;
      this.PrikaziKorisnikeDoma();
    })
  }

  getVrsteNapomene() {
    this.napomenaService.GetVrsteNapomena().subscribe(x=>{
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
    this.napomenaService.DodajNapomenu(this.napomenaDodajRequest).subscribe(x=>{
      console.log("Napomena uspjesno dodana");
    })
    korisnik.selected=false;
  }

  Dodaj() {
    let selectedKorisnici=this.prikazaniKorisniciDoma.filter(x=>x.selected===true)
    selectedKorisnici.forEach(korisnik=> {
        this.NapomenaPost(korisnik);
      }
    );
  }
}
