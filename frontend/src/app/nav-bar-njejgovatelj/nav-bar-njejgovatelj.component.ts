import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KorisnikDomaGetAllResponseKorisnik} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SignalRService} from "../Services/signalR.service";

@Component({
  selector: 'app-nav-bar-njejgovatelj',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './nav-bar-njejgovatelj.component.html',
  styleUrl: './nav-bar-njejgovatelj.component.css'
})
export class NavBarNjejgovateljComponent {
  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router,private signalRService: SignalRService) {
  }
  IdiDodajZadatke() {
      this.router.navigate(['/dodajZadatke']);

  }

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
    this.router.navigate(['/home']);
  }

  PregledOMeni() {
    this.router.navigate(['/njegovatelj/o-meni']);
  }
  ngOnInit(): void {
    this.signalRService.otvori_ws_konekciju()
    this.GetNotifications();
    this.signalRService.notificationsUpdated.subscribe(() => {
      this.refreshNotifications();
      this.hasNewNotification = true; // Set flag to true when a new notification is received
    });
  }
  refreshNotifications(): void {
    this.signalRService.GetAllNotifikacija().subscribe(
      (response) => {
        this.obavijesti = response.notifikacije;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
  public obavijesti: any;
  GetNotifications(): void {
    this.signalRService.GetAllNotifikacija().subscribe(
        (notifications) => {
          this.obavijesti = notifications.notifikacije;
        },
        (error) => {
          console.error('Error fetching notifications:', error);
        }
    );
  }
    protected readonly faBell = faBell;
}
