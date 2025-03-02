import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarAdminComponent} from "../nav-bar-admin/nav-bar-admin.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage-admin',
  standalone: true,
  imports: [CommonModule, NavBarAdminComponent],
  templateUrl: './homepage-admin.component.html',
  styleUrl: './homepage-admin.component.css'
})
export class HomepageAdminComponent {
  constructor(public router: Router) {
  }
  PregledNjegovatelja() {
    this.router.navigate(['/njegovatelj']);
  }

  PregledNutricionista() {
    this.router.navigate(['/nutricionista']);
  }

  PregledDoktora() {
    this.router.navigate(['/doktor']);
  }

  PregledFizioterapeuta() {
    this.router.navigate(['/fizioterapeut']);
  }

  DodajKorisnikaDoma() {
    this.router.navigate(['/korisnkDoma']);
  }
  PregledKorisnikaDoma() {
    this.router.navigate(['/pregledKorisnikaDoma']);
  }
  PregledOpstine() {
    this.router.navigate(['/opstina']);
  }
  PregledPoslovnePozicije() {
    this.router.navigate(['/poslovnaPozicija']);
  }
}
