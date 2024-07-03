import {MyConfig} from "../my-config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {
  KorisnikDomaGetAllResponse
} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";


@Injectable({
  providedIn: 'root',
})
export class KorisnikDomaService {
  constructor(private httpClient: HttpClient,
              private _myAuthService: MyAuthService){}

  GetAllKorisnici() {
    let url =MyConfig.adresa_servera +`/korisnikDoma-getAll`
    return this.httpClient.get<KorisnikDomaGetAllResponse>(url)
  }
  DodajKorisnikaDoma(korisnikDoma:any){
    let url = MyConfig.adresa_servera + `/korisnikDoma-dodaj`
    return this.httpClient.post(url, korisnikDoma)

  }


}
