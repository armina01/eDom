import {MyConfig} from "../my-config";

import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {NapomenaDodajRequest} from "../napomena/napomenaDodajRequest";
import {NapomenaGetAllResponse} from "../pregled-napomena/napomenaGetAllResponse";
import {GetVrstaZadatakaResponse} from "../get-zadaci/getAllZadaciResponse";
import {VrstaNapomeneGetAllResponse} from "../napomena/vrstaNapomeneGetAllResponse";
import {TerapijaLijekGetAllResponse} from "../terapija/terapijaLijekGetAllResponse";



@Injectable({
    providedIn: 'root',
})
export class TerapijaService {
    constructor(private httpClient: HttpClient,
                private _myAuthService: MyAuthService){}
    GetAllTerapije(){
        let url: string = MyConfig.adresa_servera + `/terapijaLijek/getAll`;
        return this.httpClient.get<TerapijaLijekGetAllResponse>(url)
    }
    GetVrsteNapomena(){
        let url: string = MyConfig.adresa_servera + `/vrstaNapomene/getAll`;
        return this.httpClient.get<VrstaNapomeneGetAllResponse>(url)
    }
    DodajTerapiju(data:any){
        let url: string = MyConfig.adresa_servera + `/terapijaLijek/dodaj`;
        return this.httpClient.post(url, data,  { responseType: 'text' });
    }
    UpdateTerapiju(terapijaUpdateRequest:any){
        let url: string = MyConfig.adresa_servera + `/terapijaLijek/update`;
        return this.httpClient.post(url,terapijaUpdateRequest)
    }
    IzbrisiTerapiju(item:any)
    {
        let url: string = MyConfig.adresa_servera + `/terapijaLijek/obrisi`;
        const params = new HttpParams().set('terapijaId', item.terapijaId);
        return this.httpClient.delete(url, {params})
    }
}
