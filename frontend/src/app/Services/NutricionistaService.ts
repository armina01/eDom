import {MyConfig} from "../my-config";
import {
    GetAllNjegovateljaResponseNjegovatelj,
    GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";
import {GetAllNutricionisteResponse} from "../nutricionista/getAllNutricionisteResponse";


@Injectable({
    providedIn: 'root',
})
export class NutricionistaService {
    constructor(private httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
                private _myAuthService: MyAuthService){}
    GetAllNutricionisti() {
        let url: string = MyConfig.adresa_servera + `/getAllNutricioniste`;
        return this.httpClient.get<GetAllNutricionisteResponse>(url)
    }
    DodajNutricionistu(dodajNutricionistu:any){
        let url: string = MyConfig.adresa_servera + `/dodajNutricionistu`;
        return this.httpClient.post(url, dodajNutricionistu)
    }
    IzbrisiNutricioniste(item:any){
        let url: string = MyConfig.adresa_servera + `/izbrisiNutricionistu`;
        const params = new HttpParams().set('ZaposlenikId', item.zaposlenikId);
        return this.httpClient.delete(url, {params})
    }
    UpdateNutricionistu(updatedNutricionista:any){
        let url: string = MyConfig.adresa_servera + `/updateNutricionistu`;
        return this.httpClient.post(url, updatedNutricionista)
    }
}
