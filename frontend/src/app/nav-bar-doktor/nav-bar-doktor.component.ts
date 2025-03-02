import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MyConfig} from "../my-config";

@Component({
  selector: 'app-nav-bar-doktor',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './nav-bar-doktor.component.html',
  styleUrl: './nav-bar-doktor.component.css'
})
export class NavBarDoktorComponent {

  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router) {
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

  IdiPregledKorisnika() {
    this.router.navigate(['/pregledKorisnikaDoma']);
  }

  IdiDodajNapomenu() {
    this.router.navigate(['/napomena']);
  }

  PregledOMeni() {
    this.router.navigate(['/doktor/o-meni']);
  }

  IdiDodajDijagnozu() {
    this.router.navigate(['/dijagnoza']);
  }

  IdiDodajTerapiju() {
    this.router.navigate(['/terapija']);
  }

    protected readonly faBell = faBell;
}
