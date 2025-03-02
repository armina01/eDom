import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MyAuthService} from "./MyAuthService";
import {interval, Observable, of, switchMap, takeWhile} from "rxjs";
import {MyConfig} from "../my-config";
import {AutorizacijaGuard} from "../Helper/autorizacija-guard.service";
import {AutentifikacijaToken} from "../log-in/AuthLogInResponse";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";

@Injectable({
    providedIn: 'any'
})
export class TokenService{
    constructor(private http: HttpClient, private authService: MyAuthService) { }

  getZaposlenik():GetAllNjegovateljaResponseNjegovatelj | null {
    let korisnik = window.localStorage.getItem("korisnik")??"";
    try {
      return JSON.parse(korisnik);
    }
    catch (e){
      return null;
    }
  }
    refreshAuthToken(oldToken: string): Observable<any> {
      let korisnik = this.getZaposlenik();
        let url = MyConfig.adresa_servera + `/ProvjeraTokena/Provjeri`;
        let headers = {
            'my-auth-token': oldToken
        };
        return this.http.post<any>(url, {oldToken: oldToken}, {headers: headers}).pipe(
            switchMap(resp => {
                console.log('Odgovor sa servera: ', resp);
                if (resp && resp.noviToken) {

                    let newToken: AutentifikacijaToken = {
                        id: resp.autentifikacijaToken.id,
                        vrijednost: resp.noviToken,
                        korisnickiNalogId: resp.autentifikacijaToken.korisnickiNalogID,
                        korisnickiNalog: resp.autentifikacijaToken.korisnickiNalog,
                        vrijemeEvidentiranja: resp.autentifikacijaToken.vrijemeEvidentiranja,
                        ipAdresa: resp.autentifikacijaToken.ipAdresa,
                        //fali is2WayOtkljucano

                    };
                    // @ts-ignore
                    this.authService.setLogiraniKorisnik(newToken, korisnik);
                    window.localStorage.setItem("my-auth-token", JSON.stringify(newToken));

                    return of(resp);
                } else {
                    return of(resp);
                }
            })
        );
    }}
