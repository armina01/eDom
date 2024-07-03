import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";
import {FizioterapeutGetAllResponse} from "../fizioterapeut/fizioterapeutGetAll";




@Injectable({
  providedIn: 'root',
})
export class FizioterapeutService {
  constructor(private httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
              private _myAuthService: MyAuthService){}
  GetAllFizioterapeuti() {
    let url: string = MyConfig.adresa_servera + `/fizioterapeut-getAll`;
    return this.httpClient.get<FizioterapeutGetAllResponse>(url)
  }
  DodajFizioterapeuta(fizioterapeutRequest:any){
    let url: string = MyConfig.adresa_servera + `/Fizioterapeut-dodaj`;
    return this.httpClient.post(url, fizioterapeutRequest)
  }
  IzbrisiFizioterapeuta(item:any){
    let url: string = MyConfig.adresa_servera + `/Fizioterapeut-obrisi`;
    const params = new HttpParams().set('ZaposlenikId', item.zaposlenikId);
    return this.httpClient.delete(url, {params})
  }
  UpdateFizioterapeuta(fizioterapeutUpdateRequest:any){
    let url: string = MyConfig.adresa_servera + `/Fizioterapeut-update`;
    return this.httpClient.post(url, fizioterapeutUpdateRequest)
  }
}
