import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MyConfig} from "../my-config";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {OpstinaGetAllResponse, OpsinaGetAllResponseOpstina} from "./opstina-getAll";


@Component({
  selector: 'app-opstina',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './opstina.component.html',
  styleUrl: './opstina.component.css'
})
export class OpstinaComponent {
  opstine: OpsinaGetAllResponseOpstina[]=[];

  constructor(public httpClient:HttpClient) {

  }

  Dodaj(opstina: {nazivOpstine:string, postanskiBroj:number}) {
    let url=MyConfig.adresa_servera + `/opstina-dodaj`
    console.log(opstina);
    this.httpClient.post(url, opstina).subscribe((res)=>
      console.log("Opština dodana"))
  }

  GetAllOpstine() {
    let url=MyConfig.adresa_servera + `/opstina-getAll`
    this.httpClient.get<OpstinaGetAllResponse>(url).subscribe((x:OpstinaGetAllResponse)=> {
      this.opstine = x.opstine;
    })
  }
  getAllOpstine() {
    return this.opstine;
  }
}

