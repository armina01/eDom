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
import {GetFileResponse} from "../dodaj-plan-ishrane/getFileResponse";


@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private http: HttpClient,
                private _myAuthService: MyAuthService){}
    GetAllFile(){
        let url: string = MyConfig.adresa_servera + `/getAllFiles`;
        return this.http.get<GetFileResponse>(url);
    }
    DownloadFile(file:any){
        let url: string = MyConfig.adresa_servera + `/uploadFile/downloadFile/${file}`;
        return this.http.get(url, { responseType: 'arraybuffer' })
    }
    UpdatePlanIshrane(updateZadatak:any){

    }
    IzbrisiFile(fileId:any)
    {
        let url: string = MyConfig.adresa_servera + `/deleteMyFile`;
        const params = new HttpParams().set('FileId', fileId);
        return this.http.delete(url, {params})
    }
}
