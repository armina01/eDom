import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";
import {DijagnozaGetAllResponse} from "../dijagnoza/dijagnozaGetAllResponse";




@Injectable({
  providedIn: 'root',
})
export class DijagnozaService {
  constructor(private httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
              private _myAuthService: MyAuthService){}
  GetAllDijagnoze() {
    let url: string = MyConfig.adresa_servera + `/dijagnoza/getAll`;
    return this.httpClient.get<DijagnozaGetAllResponse>(url)
  }
  DodajDijagozu(dijagnozaRequest:any){
    let url: string = MyConfig.adresa_servera + `/dijagnoza/dodaj`;
    return this.httpClient.post(url, dijagnozaRequest)
  }
  IzbrisiDijagnozu(item:any){
    let url: string = MyConfig.adresa_servera + `/dijagnoza/obrisi`;
    const params = new HttpParams().set('dijagnozaId', item.dijagnozaId);
    return this.httpClient.delete(url, {params})
  }
  UpdateDijagnozu(dijagnozaUpdateRequest:any){
    let url: string = MyConfig.adresa_servera + `/dijagnoza/update`;
    return this.httpClient.post(url, dijagnozaUpdateRequest)
  }
}
