import {MyConfig} from "../my-config";
import {
  GetAllNjegovateljaResponseNjegovatelj,
  GetAllNjegovateljiResponse
} from "../njegovatelj/getAllNjegovateljiResponse";
import {HttpClient} from "@angular/common/http";
import {Inject} from "@angular/core";
import {MY_AUTH_SERVICE_TOKEN, MyAuthService} from "./MyAuthService";

export class NjegovateljiFetch{
  constructor(private httpClient: HttpClient,@Inject(MY_AUTH_SERVICE_TOKEN) private _myAuthService: MyAuthService){}
  public allNjegovatelji: GetAllNjegovateljaResponseNjegovatelj[]=[];
  GetAllNjegovatelji() {
    const authToken = this._myAuthService.getAuthorizationToken();
    console.log('Authentication Token:', authToken);
    let url: string = MyConfig.adresa_servera + `/getAllNjegovatelji`;
    this.httpClient.get<GetAllNjegovateljiResponse>(url).subscribe(x => {
      this.allNjegovatelji = x.njegovatelji;
    })
  }
}
