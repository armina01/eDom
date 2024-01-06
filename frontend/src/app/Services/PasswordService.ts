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
import {ProvjeraPasswordaResponse} from "../pregled-podataka-njegovatelj/provjeraPasswordaResponse";


@Injectable({
    providedIn: 'root',
})
export class PasswordService {
    constructor(private httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
                private _myAuthService: MyAuthService){}
    ProvjeriPassword(requestLozinka:any){
        let url: string = MyConfig.adresa_servera + `/provjeraPassworda`;
        return this.httpClient.post<ProvjeraPasswordaResponse>(url,requestLozinka)
    }

}
