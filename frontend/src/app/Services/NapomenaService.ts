import {MyConfig} from "../my-config";

import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {NapomenaGetAllResponse} from "../pregled-napomena/napomenaGetAllResponse";
import {VrstaNapomeneGetAllResponse} from "../napomena/vrstaNapomeneGetAllResponse";



@Injectable({
  providedIn: 'root',
})
export class NapomenaService {
  constructor(private httpClient: HttpClient,
              private _myAuthService: MyAuthService){}
  GetAllNapomene(){
    let url: string = MyConfig.adresa_servera + `/napomena/getAll`;
    return this.httpClient.get<NapomenaGetAllResponse>(url)
  }
  GetVrsteNapomena(){
    let url: string = MyConfig.adresa_servera + `/vrstaNapomene/getAll`;
    return this.httpClient.get<VrstaNapomeneGetAllResponse>(url)
  }
  DodajNapomenu(data:any){
    let url: string = MyConfig.adresa_servera + `/napomena/dodaj`;
    return this.httpClient.post(url, data);
  }
  UpdateNapomenu(napomenaUpdateRequest:any){
    let url: string = MyConfig.adresa_servera + `/napomena/update`;
    return this.httpClient.post(url,napomenaUpdateRequest)
  }
  IzbrisiNapomenu(item:any)
  {
    let url: string = MyConfig.adresa_servera + `/napomena/obrisi`;
    const params = new HttpParams().set('napomenaId', item.napomenaId);
    return this.httpClient.delete(url, {params})
  }
}
