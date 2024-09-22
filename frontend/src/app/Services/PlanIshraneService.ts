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
import {GetAllZadatakResponse} from "../get-zadaci/getAllZadaciResponse";
import {DodajZadatakResponse} from "../get-zadaci/DodajZadatakResponse";
import {GetAllPlanIshraneResponse} from "../dodaj-plan-ishrane/getPlanIshraneResponse";


@Injectable({
    providedIn: 'root',
})
export class PlanIshraneService {
    constructor(private http: HttpClient,
                private _myAuthService: MyAuthService){}
    GetAllPlanIshrane(){
        let url: string = MyConfig.adresa_servera + `/getPlanIshrane`;
        return this.http.get<GetAllPlanIshraneResponse>(url);
    }
    DodajPlanIshrane(data:any){
        let url: string = MyConfig.adresa_servera + `/dodajPlanIshrane`;
        return this.http.post(url,data);
    }
    UpdatePlanIshrane(updateZadatak:any){

    }
    IzbrisiPlanIshrane(planIshrane:any)
    {
        let url: string = MyConfig.adresa_servera + `/deletePlanIshrane`;
        const params = new HttpParams().set('PlanIshraneId', planIshrane.planIshraneId);
        return this.http.delete(url, {params})
    }
}
