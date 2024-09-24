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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertService} from "../Services/AlertService";
import {NavBarDoktorComponent} from "../nav-bar-doktor/nav-bar-doktor.component";
import {ZaposlenikGetAllRsponseZaposlenik} from "../pregled-napomena/zaposlenikGetAllRsponse";
import {AlertComponent} from "../alert/alert.component";

@Component({
  selector: 'app-napomena',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarDoktorComponent, AlertComponent],
  providers:[KorisnikDomaService, NapomenaService],
  templateUrl: './napomena.component.html',
  styleUrl: './napomena.component.css'
})
export class NapomenaComponent implements OnInit{

  public korisniciDoma: KorisnikDomaGetAllResponseKorisnik[] = [];
  public vrsteNapomena:VrstaNapomeneGetAllResponseVrstaNapomene[]=[];
  public prikazaniKorisniciDoma:  OdabraniKorisnikDoma[] = [];
  napomenaForm: FormGroup;
  public   selectedKorisnici: OdabraniKorisnikDoma[] = [];
  public upozorenje:boolean=false;
  zaposlenikId:number=0;

  ngOnInit(): void {
    this.getVrsteNapomene();
    this.getAllKorisnici();

  }
  constructor(public httpClient: HttpClient,private dialog: MatDialog, private korisnikDomaService:KorisnikDomaService, private napomenaService: NapomenaService,private fb: FormBuilder, private myAlert:AlertService) {
    this.napomenaForm = this.fb.group({
      opis: ['', Validators.required],
      prioritet: [false],
      datumPostavke: ['', Validators.required],
      isAktivna: [false],
      vrstaNapomeneId: ['', Validators.required],

    });
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

  NapomenaPost(korisnik: OdabraniKorisnikDoma): void {
    let url = MyConfig.adresa_servera + `/napomena/dodaj`;
    this.napomenaDodajRequest = {
      ...this.napomenaForm.value,
      korisnikDomaID: korisnik.korisnikDomaID
    };

    const korisnikString = window.localStorage.getItem('korisnik');

    let korisnikObjekat = korisnikString ? JSON.parse(korisnikString) : null;
    this.zaposlenikId = korisnikObjekat ? korisnikObjekat.zaposlenikId : this.zaposlenikId;
    this.napomenaDodajRequest.zaposlenikId = this.zaposlenikId;

    this.napomenaService.DodajNapomenu(this.napomenaDodajRequest).subscribe(x => {
      this.myAlert.showSuccess("Napomena uspješno dodana");
    });
    korisnik.selected = false;
  }

  Dodaj() {
    this.selectedKorisnici=this.prikazaniKorisniciDoma.filter(x=>x.selected===true)
    if (this.napomenaForm.invalid || !this.selectedKorisnici.length) {
      this.napomenaForm.markAllAsTouched();
      this.upozorenje=true;
    }
    else {
      this.selectedKorisnici.forEach(korisnik => {
            this.NapomenaPost(korisnik);
            this.upozorenje=false;
          }
      );
    }


  }
}
