import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { MyConfig } from "../my-config";
import { HttpClient } from "@angular/common/http";
import {NotifikacijaRequest, NotifikacijaResponse} from "./notifikacijaRequest";
import { Observable } from "rxjs";
import { GetAllNjegovateljaResponseNjegovatelj } from "../njegovatelj/getAllNjegovateljiResponse";


@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public notificationsUpdated: EventEmitter<void> = new EventEmitter<void>();
  public not: any;
  public static ConnectionId: string | null = null;
  private isConnected: boolean = false;
  private connection: signalR.HubConnection | null = null;

  constructor(private httpClient: HttpClient) {}

  getZaposlenik(): GetAllNjegovateljaResponseNjegovatelj | null {
    let korisnik = window.localStorage.getItem("korisnik") ?? "";
    try {
      return JSON.parse(korisnik);
    } catch (e) {
      return null;
    }
  }

  public otvori_ws_konekciju(): void {
    if (this.isConnected) {
      console.log("SignalR konekcija je već uspostavljena.");
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${MyConfig.adresa_servera}/hub-putanja`)
      .withAutomaticReconnect()
      .build();

    this.connection.on("dodan_novi_zadatak", (p) => {
      // Check if the notification is different from the last one
      this.not = p;
      var notifikacija: NotifikacijaRequest = { poruka: p.message };
      this.notificationsUpdated.emit();
      if (p.userId === this.getZaposlenik()?.zaposlenikId) {
        console.log("Zaposlenici", p, this.getZaposlenik()?.zaposlenikId);
        const url: string = MyConfig.adresa_servera + '/dodaj-notifikaciju';
        this.httpClient.post(url, notifikacija).subscribe(() => {});
      }
    });

    this.connection.on("dodana_nova_napomena", (napomena) => {
      alert("Dodana je nova napomena: " + napomena);
    });

    this.connection
      .start()
      .then(() => {
        SignalRService.ConnectionId = this.connection?.connectionId ?? null;
        //console.log("Konekcija otvorena: " + (this.connection?.connectionId ?? "Nema ID"));

        const tokenString = localStorage.getItem("my-auth-token");
        if (tokenString) {
          try {
            const tokenObject = JSON.parse(tokenString);
            const isNjegovatelj = tokenObject.korisnickiNalog?.jeNjegovatelj ?? false;
            if (isNjegovatelj) {
              this.connection?.invoke("PridruziSeGrupi", "Njegovatelji")
                //.then(() => console.log(`Pridružen grupi Njegovatelji`))
                .catch(err => console.error(err));
            }
          } catch (error) {
            console.error("Greška pri parsiranju tokena:", error);
          }
        } else {
          console.log("Token nije pronađen u localStorage.");
        }
      })
      .catch(err => console.error("Greška pri uspostavljanju konekcije:", err));
  }

  public closeConnection(): void {

    if (this.connection && SignalRService.ConnectionId) {
      this.connection.stop()
        .then(() => {
          //console.log("SignalR konekcija zatvorena.");
          SignalRService.ConnectionId = null;
        })
        .catch(err => console.error("Greška pri zatvaranju konekcije:", err));
    } else {
      console.log("Nema aktivne SignalR konekcije.");
    }
  }

  public GetAllNotifikacija(): Observable<NotifikacijaResponse> {
    let url: string = MyConfig.adresa_servera + `/getNotifikacije`;
    return this.httpClient.get<NotifikacijaResponse>(url);
  }
}
