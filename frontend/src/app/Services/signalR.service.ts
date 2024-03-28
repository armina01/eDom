import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { MyConfig } from "../my-config";
import { HttpClient } from "@angular/common/http";
import { NotifikacijaRequest, NotifikacijaResponse } from "./notifikacijaRequest";
import { Observable } from "rxjs";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";

@Injectable({
    providedIn: 'root',
})

export class SignalRService {
    public notificationsUpdated: EventEmitter<void> = new EventEmitter<void>();
    public not:any;
    constructor(private httpClient: HttpClient) {}
    getZaposlenik():GetAllNjegovateljaResponseNjegovatelj | null {
        let korisnik = window.localStorage.getItem("korisnik")??"";
        try {
            return JSON.parse(korisnik);
        }
        catch (e){
            return null;
        }
    }
    public otvori_ws_konekciju(): void {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl(`${MyConfig.adresa_servera}/hub-putanja`)
            .build();

        connection.on("dodan_novi_zadatak", (p) => {
         // Check if the notification is different from the last one
            this.not = p;
            var notifikacija: NotifikacijaRequest = {poruka: p.message};
            this.notificationsUpdated.emit();
            if(p.userId===this.getZaposlenik()?.zaposlenikId) {
                console.log("Zaposlenici",p.userId.zaposlenikId,this.getZaposlenik()?.zaposlenikId)
                const url: string = MyConfig.adresa_servera + '/dodaj-notifikaciju'
                this.httpClient.post(url, notifikacija).subscribe(() => {});
            }
        });

        connection
            .start()
            .then(() => {
                console.log("konekcija otvorena " + connection.connectionId);

            });
    }

    public GetAllNotifikacija(): Observable<NotifikacijaResponse> {
        let url: string = MyConfig.adresa_servera + `/getNotifikacije`;
        return this.httpClient.get<NotifikacijaResponse>(url);
    }
}
