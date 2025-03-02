import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MyConfig} from "../my-config";

@Component({
  selector: 'app-nav-bar-nutricionista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar-nutricionista.component.html',
  styleUrl: './nav-bar-nutricionista.component.css'
})
export class NavBarNutricionistaComponent {
  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router) {
  }
  IdiDodajZadatke() {
    this.router.navigate(['/dodajPlanoveIshrane']);

  }

  IdiPregledKorisnika() {
    this.router.navigate(['/pregledKorisnikaDoma']);
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
    this.router.navigate(['/njegovatelj/0-meni']);
  }
}
