import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";
import {DoktorGetAllResponse} from "../doktor/doktorGetAllResponse";



@Injectable({
  providedIn: 'root',
})
export class DoktorService {
  constructor(private httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
              private _myAuthService: MyAuthService){}
  GetAllDoktori() {
    let url: string = MyConfig.adresa_servera + `/doktor-getAll`;
    return this.httpClient.get<DoktorGetAllResponse>(url)
  }
  DodajDoktora(doktorRequest:any){
    let url: string = MyConfig.adresa_servera + `/Doktor-dodaj`;
    return this.httpClient.post(url, doktorRequest)
  }
  IzbrisiDoktora(item:any){
    let url: string = MyConfig.adresa_servera + `/doktor-obrisi`;
    const params = new HttpParams().set('ZaposlenikId', item.zaposlenikId);
    return this.httpClient.delete(url, {params})
  }
  UpdateDoktora(doktorUpdateRequest:any){
    let url: string = MyConfig.adresa_servera + `/doktor-update`;
    return this.httpClient.post(url, doktorUpdateRequest)
  }
}
