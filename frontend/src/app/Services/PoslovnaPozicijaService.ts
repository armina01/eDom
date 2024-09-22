import {MyConfig} from "../my-config";
import {
    GetAllNjegovateljaResponseNjegovatelj,
    GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";
import {GetAllPoslovnaPozicijaResponse} from "../poslovna-pozicija/getAllPoslovnaPozicija";


@Injectable({
    providedIn: 'root',
})
export class PoslovnaPozicijaService {
    constructor(private httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
                private _myAuthService: MyAuthService){}

    GetAllPoslovnaPozicija(){
        let url: string = MyConfig.adresa_servera + `/getAllPoslovnaPozicija`;
        return this.httpClient.get<GetAllPoslovnaPozicijaResponse>(url)
    }
    DodajPoslovnuPoziciju(poslovnaPozicijaRequest:any){
        let url = MyConfig.adresa_servera + `/dodajPoslovnuPoziciju`;
        return this.httpClient.post(url, poslovnaPozicijaRequest)
    }
    IzbrisiPoslovnuPoziciju(data:any){
        let url: string = MyConfig.adresa_servera + `/izbrisiPoslovnuPoziciju`;
        const params = new HttpParams().set('PoslovnaPozicijaId', data.poslovnaPozicijaId);
        return this.httpClient.delete(url, {params})
    }

}
