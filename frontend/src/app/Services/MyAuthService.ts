import {HttpClient} from "@angular/common/http";
import {Injectable, InjectionToken} from "@angular/core";
import {AutentifikacijaToken} from "../Helper/autentifikacijToken";
import {GetAllZaposlenikResponseZaposlenik} from "./getAllZaposleniciResponse";

//export const MY_AUTH_SERVICE_TOKEN = new InjectionToken<MyAuthService>('MY_AUTH_SERVICE_TOKEN');
@Injectable({providedIn: 'root'})
export class MyAuthService{
  constructor(private httpClient: HttpClient) {
  }

  isLogiran():boolean{
    return this.getAuthorizationToken() != null;
  }

  getAuthorizationToken():AutentifikacijaToken | null {
    let tokenString = window.localStorage.getItem("my-auth-token")??"";
    try {
      return JSON.parse(tokenString);
    }
    catch (e){
      return null;
    }
  }
  jeAdmin():boolean {
    return this.getAuthorizationToken()?.korisnickiNalog.jeAdmin ?? false
  }
  jeDoktor():boolean{
    return this.getAuthorizationToken()?.korisnickiNalog.jeDoktor ?? false
  }

  jeFizioterapeut():boolean{
    return this.getAuthorizationToken()?.korisnickiNalog.jeFizioterapeut ?? false
  }

  jeNjegovatelj():boolean{
    return this.getAuthorizationToken()?.korisnickiNalog.jeNjegovatelj ?? false
  }

  jeNutricionista():boolean {
    return this.getAuthorizationToken()?.korisnickiNalog.jeNutricionista ?? false
  }


  setLogiraniKorisnik(x: AutentifikacijaToken | null, korisnik: GetAllZaposlenikResponseZaposlenik | undefined) {

    if (x == null){
      window.localStorage.setItem("my-auth-token", '');
    }
    else {
      window.localStorage.setItem("my-auth-token", JSON.stringify(x));
      if(korisnik===null)
      {
          console.log("Korisnik",korisnik)
          window.localStorage.setItem("korisnik", JSON.stringify(korisnik));
      }
      else{
        console.log("Korisnik",korisnik)
          window.localStorage.setItem("korisnik", JSON.stringify(korisnik));
      }
    }
  }


}
