import {MyConfig} from "../my-config";
import {
  GetAllNjegovateljaResponseNjegovatelj,
  GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";
import { MyAuthService} from "./MyAuthService";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class NjegovateljiService {
  constructor(private httpClient: HttpClient,//@Inject(MY_AUTH_SERVICE_TOKEN)
               private _myAuthService: MyAuthService){}
  public allNjegovatelji: GetAllNjegovateljaResponseNjegovatelj[]=[];
  GetAllNjegovatelji(): Observable<GetAllNjegovateljiResponse> {
    const authToken = this._myAuthService.getAuthorizationToken();
    console.log('Authentication Token:', authToken);
    let url: string = MyConfig.adresa_servera + `/getAllNjegovatelji`;
    return this.httpClient.get<GetAllNjegovateljiResponse>(url);
  }
  dodajNjegovatelja(njegovatelj:any): Observable<any> {
    const url: string = MyConfig.adresa_servera + '/dodajNjegovatelja';
    return this.httpClient.post(url, njegovatelj);
  }
  deleteNjegovatelj(njegovateljId: number): Observable<any> {
    const url: string = MyConfig.adresa_servera + `/izbrisiNjegovatelja`;
    const params = new HttpParams().set('NjegovateljId', njegovateljId);

    return this.httpClient.delete(url, { params });
  }
}
