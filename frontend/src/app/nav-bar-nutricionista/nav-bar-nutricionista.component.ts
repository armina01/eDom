import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

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
    this.router.navigate(['/home']);
  }

  PregledOMeni() {
    this.router.navigate(['/njegovatelj/0-meni']);
  }
}
