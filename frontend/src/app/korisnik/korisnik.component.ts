import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyConfig} from "../my-config";
import {HttpClient} from "@angular/common/http";
import {OpstinaComponent} from "../opstina/opstina.component";
import {OpsinaGetAllResponseOpstina, OpstinaGetAllResponse} from "../opstina/opstina-getAll";
import {map, Observable} from "rxjs";
import {KorisnikRequest} from "./korisnikRequest";
import {PoslovnaPozicijaRequest} from "../poslovna-pozicija/poslovnaPozicijaRequest";
@Component({
  selector: 'app-korisnik',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './korisnik.component.html',
  styleUrl: './korisnik.component.css'
})
export class KorisnikComponent implements OnInit {

  options:OpsinaGetAllResponseOpstina[]=[];

  constructor(public httpClient:HttpClient) {
  }

    public korisnikRequest: KorisnikRequest={
        imePrezime:"",
        jmbg: "",
        datumRodjenja: "",
        brojSobe: 0,
        opstinaID:0

    }
    ngOnInit(): void {
        this.GetAllOpstine().subscribe((data)=>{
          this.options=data;
        });
    }

  GetAllOpstine(): Observable<OpsinaGetAllResponseOpstina[]>{
        let url=MyConfig.adresa_servera + `/opstina-getAll`
        return this.httpClient.get<OpstinaGetAllResponse>(url).pipe(
          map((response:OpstinaGetAllResponse)=>response.opstine)
        );
  }

  Dodaj() {
    let url=MyConfig.adresa_servera + `/korisnikDoma-dodaj`
    console.log(this.korisnikRequest);
    if(this.korisnikRequest.opstinaID!=0) {
        this.httpClient.post(url, this.korisnikRequest).subscribe((res) =>
            console.log("Korisnik doma dodan"))
    }
  }


}
