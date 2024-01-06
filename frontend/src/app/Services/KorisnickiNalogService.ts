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


@Injectable({
    providedIn: 'root',
})
export class KorisnickiNalogService {
    constructor(private httpClient: HttpClient,
                private _myAuthService: MyAuthService){}
    GetAllKorisnickiNalog():Observable<GetAllKorisnickiNalogResponse>{
    let url: string = MyConfig.adresa_servera + `/get-all-KorisnickiNalog`;
    return this.httpClient.get<GetAllKorisnickiNalogResponse>(url)
        }

    DodajKorisnickiNalog(korisnickiNalogRequest: KorisnickiNalogRequest):Observable<any>{
        let url = MyConfig.adresa_servera + `/dodajKorisnickiNalog`;
        return this.httpClient.post(url, korisnickiNalogRequest)
    }
    ObrisiKorisnickiNalog(data:any){
        let url: string = MyConfig.adresa_servera + `/izbrisiKorisnickiNalog`;
        const params = new HttpParams().set('KorisnikId', data.nalogId);
        return this.httpClient.delete(url, {params})
    }
    UpdateKorisnickiNalog(korisnickiNalog:any){
        let url: string = MyConfig.adresa_servera + `/updateNaloga`;
        return this.httpClient.post(url, korisnickiNalog)
    }
}
