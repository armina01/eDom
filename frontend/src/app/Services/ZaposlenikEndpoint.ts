import {HttpClient} from "@angular/common/http";
import {ErrorHandler, Inject, Injectable} from "@angular/core";
import {MyConfig} from "../my-config";
import {GetAllZaposlenikResponse, GetAllZaposlenikResponseZaposlenik} from "./getAllZaposleniciResponse";
import {catchError, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ZaposlenikEndpoint{
  constructor(private httpClient: HttpClient,private handler: ErrorHandler) {}
  public allZaposlenici: GetAllZaposlenikResponseZaposlenik[]=[];


  GetAllzaposlenici(): Observable<GetAllZaposlenikResponseZaposlenik[]> {
    let url: string = MyConfig.adresa_servera + `/getAllZaposlenici`;

    // Return the observable from the HttpClient
    return this.httpClient.get<GetAllZaposlenikResponse>(url).pipe(
        map(response => response.zaposlenici || []) // Extract and return zaposlenici array
    );
  }
}
