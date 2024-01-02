import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyConfig} from "../my-config";
import {NapomenaGetAllResponse, NapomenaGetAllResponseNapomena} from "../pregled-napomena/napomenaGetAllResponse";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ZaposlenikGetAllRsponse, ZaposlenikGetAllRsponseZaposlenik} from "../pregled-napomena/zaposlenikGetAllRsponse";
import {
  VrstaNapomeneGetAllResponse,
  VrstaNapomeneGetAllResponseVrstaNapomene
} from "../napomena/vrstaNapomeneGetAllResponse";

@Component({
  selector: 'app-pregled-aktivnih-napomena',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pregled-aktivnih-napomena.component.html',
  styleUrl: './pregled-aktivnih-napomena.component.css'
})
export class PregledAktivnihNapomenaComponent implements OnInit{

  public napomeneAll:NapomenaGetAllResponseNapomena[]=[];
  public odabraneNapomene: NapomenaGetAllResponseNapomena[]=[];
  public aktivneNapomene: NapomenaGetAllResponseNapomena[]=[];
  public zaposlenici:ZaposlenikGetAllRsponseZaposlenik[]=[];
  public korisnikId:number=0;
  public vrsteNapomena:VrstaNapomeneGetAllResponseVrstaNapomene[]=[];
    ngOnInit(): void {
        this.GetAllNapomene();
        this.getVrsteNapomene();
        this.GetAllZaposlenike();
    }
   constructor(public httpClient:HttpClient, public route: ActivatedRoute) {
     this.route.params.subscribe(params => {
       this.korisnikId = +params['id'];
     });
   }

  public GetAllNapomene() {
    let url = MyConfig.adresa_servera + `/napomena/getAll`
    this.httpClient.get<NapomenaGetAllResponse>(url).subscribe((x: NapomenaGetAllResponse) => {
      this.napomeneAll = x.napomene;
      this.odabraneNapomene = this.napomeneAll.filter(x => x.korisnikDomaID === this.korisnikId);
      console.log(this.odabraneNapomene);
      this.GetAktivneNapomene();

    })
  }
  getVrsteNapomene() {
    let url = MyConfig.adresa_servera + `/vrstaNapomene/getAll`
    this.httpClient.get<VrstaNapomeneGetAllResponse>(url).subscribe((x: VrstaNapomeneGetAllResponse) => {
      this.vrsteNapomena=x.vrsteNapomena;
    })
  }
  GetAllZaposlenike()
  {
    let url: string = MyConfig.adresa_servera + `/getAllZaposlenici`;
    this.httpClient.get<ZaposlenikGetAllRsponse>(url).subscribe(x => {
      this.zaposlenici = x.zaposlenici;
    })
  }

  GetAktivneNapomene()
  {
    this.aktivneNapomene=this.odabraneNapomene.filter(item => item.isAktivna==true);
    return this.aktivneNapomene;
  }

}
