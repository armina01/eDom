import {Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {KorisnikDomaGetAllResponseKorisnik} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SignalRService} from "../Services/signalR.service";
import {MyConfig} from "../my-config";
import {NotifikacijaResponse} from "../Services/notifikacijaRequest";
import {Subscription} from "rxjs";
import {GetAllNjegovateljaResponseNjegovatelj} from "../njegovatelj/getAllNjegovateljiResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar-njejgovatelj',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './nav-bar-njejgovatelj.component.html',
  styleUrl: './nav-bar-njejgovatelj.component.css'
})
export class NavBarNjejgovateljComponent implements OnDestroy {

  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router,private signalRService: SignalRService) {
  }

  ngOnDestroy(): void {
    this.signalRService.closeConnection();
    }

  isMenuOpen: boolean = false;

  toggleDropdown() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  IdiDodajZadatke() {
      this.router.navigate(['/dodajZadatke']);

  }
  public notification2 = "";
  IdiPregledKorisnika() {
    this.router.navigate(['/pregledKorisnikaDoma']);
  }
  public hasNewNotification: boolean = false;
  obavijetUkljucena:boolean=false;
  markNotificationAsRead(): void {
    this.hasNewNotification = false;
    this.obavijetUkljucena=!this.obavijetUkljucena
  }

  IdiPocetna() {
    let token = window.localStorage.getItem("my-auth-token")??"";
    window.localStorage.setItem("my-auth-token","");
    let url: string = MyConfig.adresa_servera + `/logout`;
    this.httpClient.post(url, {}, {
      headers:{
        "my-auth-token": token
      }
    }).subscribe(x=>{
    })

    this.router.navigate(['/home']);
  }

  PregledOMeni() {
    this.router.navigate(['/njegovatelj/o-meni']);
  }
  ngOnInit(): void {
    this.signalRService.otvori_ws_konekciju();
    this.GetNotifications();
    this.signalRService.notificationsUpdated.subscribe(() => {
      this.hasNewNotification = true;
      this.refreshNotifications();
    });

  }

  refreshNotifications(): void {
    this.korisnik=this.getZaposlenik();
    this.signalRService.GetAllNotifikacija().subscribe(
      (response) => {
        this.obavijesti = response.notifikacije;
        if (this.korisnik.zaposlenikId===this.signalRService.not.userId) {
          this.hasNewNotification = false;
          }
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
  public obavijesti: any;
  getZaposlenik():GetAllNjegovateljaResponseNjegovatelj | null {
    let korisnik = window.localStorage.getItem("korisnik")??"";
    try {
      return JSON.parse(korisnik);
    }
    catch (e){
      return null;
    }
  }
  korisnik:any;
  GetNotifications(): void {
    this.korisnik=this.getZaposlenik();

    this.signalRService.GetAllNotifikacija().subscribe(
        (notifications) => {
          this.obavijesti = notifications.notifikacije;
          if (this.korisnik===this.obavijesti.userId) {
            this.hasNewNotification = false; // Exclude all currently logged-in users from being marked with a new notification
          }
        },
        (error) => {
          console.error('Error fetching notifications:', error);
        }
    );
  }
    protected readonly faBell = faBell;


}
