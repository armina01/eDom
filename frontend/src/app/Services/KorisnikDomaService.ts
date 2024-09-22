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
  IzbrisiKorisnikaDoma(item:any){
    let url: string = MyConfig.adresa_servera + `/korisnikDoma-obrisi`
    const params = new HttpParams().set('ZaposlenikId', item.zaposlenikId);
    return this.httpClient.delete(url, {params})
  }
  UpdateKorisnikaDoma(korisnikUpdateRequest:any){
    const url = MyConfig.adresa_servera+`/korisnikDoma-update`;
    return this.httpClient.post(url, korisnikUpdateRequest)
  }
  IzbrisiSlikuKorisnika(item:any)
  {
    let url: string = MyConfig.adresa_servera + `/korisnikDoma/obrisiSliku`;
    const params = new HttpParams().set('KorisnikDomaID',item);
    return this.httpClient.delete(url, {params})
  }


}
