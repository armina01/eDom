import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {GetAllKorisnickiNalogResponse} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {HttpClient} from "@angular/common/http";
import {GetAllZadatakResponse, GetAllZadatakResponseZadatak} from "./getAllZadaciResponse";

@Component({
  selector: 'app-get-zadaci',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-zadaci.component.html',
  styleUrl: './get-zadaci.component.css'
})
export class GetZadaciComponent {

  constructor(public httpClient: HttpClient) {
  }
  showOpsti:boolean=false;
  showFizijatrijski=false;
  showMedicinski=false;
  public medicinskiZadatak: GetAllZadatakResponseZadatak[]=[];
  public opstiZadatak: GetAllZadatakResponseZadatak[]=[];
  public fizijatrijskiZadatak: GetAllZadatakResponseZadatak[]=[];
  public zadaci:GetAllZadatakResponseZadatak[]=[];
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
}
