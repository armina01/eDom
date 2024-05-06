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
    public static ConnectionId:string | null;

    constructor(private httpClient: HttpClient) {}
    public notifications = "";
    public otvori_ws_konekciju(): void {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl(`${MyConfig.adresa_servera}/hub-putanja`)
            .build();

        connection.on("dodan_novi_zadatak", (p) => {
            var notifikacija: NotifikacijaRequest = { poruka: p };
            let notifications = "<i class=\"fa fa-bell\"></i>";
            const url: string = MyConfig.adresa_servera + '/dodaj-notifikaciju'

            this.httpClient.post(url, notifikacija).subscribe(() => {
                console.log("Uspjesno notifikacija");
                this.notificationsUpdated.emit(); // Emit event when new notification is added
            });
        });

      connection.on("dodana_nova_napomena", (napomena) => {
        alert("Dodana je nova napomena: " + napomena);
      });

        connection
            .start()
            .then(() => {

              SignalRService.ConnectionId=connection.connectionId;

                console.log("konekcija otvorena " + connection.connectionId);
            });
    }

    public GetAllNotifikacija(): Observable<NotifikacijaResponse> {
        let url: string = MyConfig.adresa_servera + `/getNotifikacije`;
        return this.httpClient.get<NotifikacijaResponse>(url);
    }
}
