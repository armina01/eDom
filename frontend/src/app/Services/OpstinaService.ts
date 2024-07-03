import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";
import {GetAllNutricionisteResponse} from "../nutricionista/getAllNutricionisteResponse";
import {
  KorisnikDomaGetAllResponse,
  KorisnikDomaGetAllResponseKorisnik
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {OpstinaGetAllResponse} from "../opstina/opstina-getAll";


@Injectable({
  providedIn: 'root',
})
export class OpstinaServiceService {
  constructor(private httpClient: HttpClient,
              private _myAuthService: MyAuthService){}

  GetAllOpstine() {
    let url=MyConfig.adresa_servera + `/opstina-getAll`
    return this.httpClient.get<OpstinaGetAllResponse>(url)
  }

  DodajOpstinu(opstinaRequest:any){
    let url: string = MyConfig.adresa_servera + `/opstina-dodaj`;
    return this.httpClient.post(url, opstinaRequest)
  }
  IzbrisiOpstinu(item:any){
    let url: string = MyConfig.adresa_servera + `/opstina-obrisi`;
    const params = new HttpParams().set('OpstinaID', item.OpstinaID);
    return this.httpClient.delete(url, {params})
  }



}
