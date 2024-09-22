import {MyConfig} from "../my-config";

import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {NapomenaDodajRequest} from "../napomena/napomenaDodajRequest";
import {NapomenaGetAllResponse} from "../pregled-napomena/napomenaGetAllResponse";
import {GetVrstaZadatakaResponse} from "../get-zadaci/getAllZadaciResponse";
import {VrstaNapomeneGetAllResponse} from "../napomena/vrstaNapomeneGetAllResponse";
import {LijekGetAllResponse} from "../terapija/lijekGetAllResponse";



@Injectable({
    providedIn: 'root',
})
export class LijekService {
    constructor(private httpClient: HttpClient,
                private _myAuthService: MyAuthService){}
    GetAllLijekovi(){
        let url: string = MyConfig.adresa_servera + `/lijek/getAll`;
        return this.httpClient.get<LijekGetAllResponse>(url)
    }
    DodajLijek(data:any){
        let url: string = MyConfig.adresa_servera + `/lijek/dodaj`;
        return this.httpClient.post(url, data);
    }
    UpdateLijek(lijekUpdateRequest:any){
        let url: string = MyConfig.adresa_servera + `/lijek/update`;
        return this.httpClient.post(url,lijekUpdateRequest)
    }
    IzbrisiLijek(item:any)
    {
        let url: string = MyConfig.adresa_servera + `/lijek/obrisi`;
        const params = new HttpParams().set('lijekId', item.lijekId);
        return this.httpClient.delete(url, {params})
    }
}
