import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { MyConfig } from "../my-config";
import { HttpClient } from "@angular/common/http";
import { NotifikacijaRequest, NotifikacijaResponse } from "./notifikacijaRequest";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class SignalRService {
    public notificationsUpdated: EventEmitter<void> = new EventEmitter<void>();
    public not:any;
    constructor(private httpClient: HttpClient) {}
    public otvori_ws_konekciju(): void {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl(`${MyConfig.adresa_servera}/hub-putanja`)
            .build();

        connection.on("dodan_novi_zadatak", (p) => {
         // Check if the notification is different from the last one
            this.not = p;
            var notifikacija: NotifikacijaRequest = {poruka: p.message};
            const url: string = MyConfig.adresa_servera + '/dodaj-notifikaciju'

            this.httpClient.post(url, notifikacija).subscribe(() => {

              console.log("Uspjesno notifikacija");
              this.notificationsUpdated.emit();
            });

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
