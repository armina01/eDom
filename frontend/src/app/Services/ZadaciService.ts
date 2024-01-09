import {MyConfig} from "../my-config";
import {
    GetAllNjegovateljaResponseNjegovatelj,
    GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";
import {GetAllKorisnickiNalogResponse} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {KorisnickiNalogRequest} from "../korisnicki-nalog/korisnickiNalogRequest";
import {
    GetAllZadatakResponse,
    GetIntervalZadatakaResponse,
    GetVrstaZadatakaResponse
} from "../get-zadaci/getAllZadaciResponse";
import {DodajZadatakResponse} from "../get-zadaci/DodajZadatakResponse";


@Injectable({
    providedIn: 'root',
})
export class ZadaciService {
    constructor(private httpClient: HttpClient,
                private _myAuthService: MyAuthService){}
    GetAllZadaci(){
        let url: string = MyConfig.adresa_servera + `/getAllZadatak`;
        return this.httpClient.get<GetAllZadatakResponse>(url)
    }
  GetIntervalZadataka(){
    let url: string = MyConfig.adresa_servera + `/getIntervalZadatka`;
    return this.httpClient.get<GetIntervalZadatakaResponse>(url)
  }
    GetVrsteZadataka(){
        let url: string = MyConfig.adresa_servera + `/getVrsteZadatka`;
        return this.httpClient.get<GetVrstaZadatakaResponse>(url)
    }
    DodajZadatak(data:any){
        let url: string = MyConfig.adresa_servera + `/dodajZadatak`;
        return this.httpClient.post<DodajZadatakResponse>(url, data);
    }
    UpdateZadatak(updateZadatak:any){
        let url: string = MyConfig.adresa_servera + `/updateZadatak`;
        return this.httpClient.post(url,updateZadatak)
    }
    IzbrisiZadatak(item:any)
    {
        let url: string = MyConfig.adresa_servera + `/obrisiZadatak`;
        const params = new HttpParams().set('ZadatakId', item.zadatakId);
        return this.httpClient.delete(url, {params})
    }
}
