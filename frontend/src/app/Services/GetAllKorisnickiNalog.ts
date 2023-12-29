import {MyConfig} from "../my-config";
import {
  GetAllKorisnickiNalogResponse,
  GetAllKorisnickiNalogResponseKorisnickiNalog
} from "../korisnicki-nalog/getAllKorisnickiNalogResponse";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

export class KorisnickiNalogFetch{
  constructor(public httpClient: HttpClient,private dialog: MatDialog) {
  }
  korisnickiNalog: GetAllKorisnickiNalogResponseKorisnickiNalog[] = [];
  GetAllKorisnickiNalog(): void {
    let url: string = MyConfig.adresa_servera + `/get-all-KorisnickiNalog`;
    this.httpClient.get<GetAllKorisnickiNalogResponse>(url).subscribe(x => {
      console.log(x.korisnickiNalozi)
      this.korisnickiNalog = x.korisnickiNalozi
    })
  }
}
