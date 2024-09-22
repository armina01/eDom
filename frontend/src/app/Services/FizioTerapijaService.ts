import {MyConfig} from "../my-config";

import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {NapomenaDodajRequest} from "../napomena/napomenaDodajRequest";
import {NapomenaGetAllResponse} from "../pregled-napomena/napomenaGetAllResponse";
import {GetVrstaZadatakaResponse} from "../get-zadaci/getAllZadaciResponse";
import {VrstaNapomeneGetAllResponse} from "../napomena/vrstaNapomeneGetAllResponse";
import {TerapijaLijekGetAllResponse} from "../terapija/terapijaLijekGetAllResponse";
import {FizioTerapijaGetAllResponse} from "../fizio-terapija/fizioTerapijaGetAllResponse";



@Injectable({
  providedIn: 'root',
})
export class FizioTerapijaService {
  constructor(private httpClient: HttpClient,
              private _myAuthService: MyAuthService){}
  GetAllTerapije(){
    let url: string = MyConfig.adresa_servera + `/fizioTerapija/getAll`;
    return this.httpClient.get<FizioTerapijaGetAllResponse>(url)
  }

  DodajTerapiju(data:any){
      let url = MyConfig.adresa_servera + `/fizioTerapija/dodaj`;
    return this.httpClient.post(url, data,  { responseType: 'text' });
  }
  UpdateTerapiju(terapijaUpdateRequest:any){
    let url: string = MyConfig.adresa_servera + `/fizioTerapija/update`;
    return this.httpClient.post(url,terapijaUpdateRequest)
  }
  IzbrisiTerapiju(item:any)
  {
      let url: string = MyConfig.adresa_servera + `/fizioTerapija/obrisi`;
      const params = new HttpParams().set('fizioTerapijaId', item.fizioTerapijaId);
      return this.httpClient.delete(url, {params})
  }
}
