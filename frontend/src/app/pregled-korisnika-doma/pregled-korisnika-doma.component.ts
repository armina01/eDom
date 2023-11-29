import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {KorisnikDomaGetAllResponse, KorisnikDomaGetAllResponseKorisnik} from "./korisnikDoma-getAll-response";
import {HttpClient} from "@angular/common/http";
import {MyConfig} from "../my-config";

@Component({
  selector: 'app-pregled-korisnika-doma',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pregled-korisnika-doma.component.html',
  styleUrl: './pregled-korisnika-doma.component.css'
})
export class PregledKorisnikaDomaComponent implements  OnInit{

  constructor(public httpClient:HttpClient) {
  }

  pretragaNaziv="";
  korisnici:KorisnikDomaGetAllResponseKorisnik[]=[];
  ngOnInit(): void {
    let url =MyConfig.adresa_servera +`/korisnikDoma-getAll`
    this.httpClient.get<KorisnikDomaGetAllResponse>(url).subscribe((x:KorisnikDomaGetAllResponse)=>{
      this.korisnici = x.korisnici;
    })
  }
  getFiltriraniKorisnici() {
    return this.korisnici.filter(x=>(x.imePrezime.toLowerCase()).startsWith(this.pretragaNaziv.toLowerCase()))
  }
}
