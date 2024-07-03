import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {OpstinaComponent} from "../opstina/opstina.component";
import {OpsinaGetAllResponseOpstina, OpstinaGetAllResponse} from "../opstina/opstina-getAll";
import {map, Observable} from "rxjs";
import {KorisnikRequest} from "./korisnikRequest";
import {MyAuthService} from "../Services/MyAuthService";
import {SignalRService} from "../Services/signalR.service";
import {KorisnikDomaService} from "../Services/KorisnikDomaService";
import {OpstinaServiceService} from "../Services/OpstinaService";


@Component({
  selector: 'app-korisnik',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers:[KorisnikDomaService, OpstinaServiceService],
  templateUrl: './korisnik.component.html',
  styleUrl: './korisnik.component.css'
})
export class KorisnikComponent implements OnInit {

    options: OpsinaGetAllResponseOpstina[] = [];
    pretragaNaziv = "";

    constructor(public httpClient: HttpClient,private korisnikDomaService:KorisnikDomaService, private opstinaService:OpstinaServiceService) {

    }

    public korisnikRequest: KorisnikRequest = {
        imePrezime: "",
        jmbg: "",
        datumRodjenja: "",
        brojSobe: 0,
        opstinaID: 0

    }

    ngOnInit(): void {
        this.opstinaService.GetAllOpstine().subscribe((data) => {
            this.options = data.opstine;
        });

    }

    GetAllOpstine(): Observable<OpsinaGetAllResponseOpstina[]> {
        let url = MyConfig.adresa_servera + `/opstina-getAll`
        return this.httpClient.get<OpstinaGetAllResponse>(url).pipe(
            map((response: OpstinaGetAllResponse) => response.opstine)
        );
    }

    Dodaj() {
        //let url = MyConfig.adresa_servera + `/korisnikDoma-dodaj`
        //console.log(this.korisnikRequest);
        if (this.korisnikRequest.opstinaID != 0) {
          this.korisnikDomaService.DodajKorisnikaDoma(this.korisnikRequest).subscribe()
           console.log("Korisnik uspjesno dodan")
        }

    }

}

