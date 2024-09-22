import {MyConfig} from "../my-config";
import {
    GetAllNjegovateljaResponseNjegovatelj,
    GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";
import {Enable2FAuthRequest} from "../enable-2-fa/Enable2FAuthRequest";
import {Auth2FOtkljucajRequest} from "../enable-2-fa/OtkljucajRequest";
import {NoResponse} from "../Helper/NoResponse";


@Injectable({
    providedIn: 'root',
})
export class MailService {
    constructor(private httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
                private _myAuthService: MyAuthService){}
    PosaljiMail(mailRequest:Enable2FAuthRequest){
        const url: string = MyConfig.adresa_servera + '/enable2F';
        return this.httpClient.post(url, mailRequest);
    }
    OtkljucajAuth(Auth2FOtkljucajRequest:Auth2FOtkljucajRequest){

        const url: string = MyConfig.adresa_servera + '/2f-otklucaj';
        return this.httpClient.post<NoResponse>(url, Auth2FOtkljucajRequest);
    }

}
