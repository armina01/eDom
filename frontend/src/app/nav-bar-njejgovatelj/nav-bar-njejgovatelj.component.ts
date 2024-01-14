import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KorisnikDomaGetAllResponseKorisnik} from "../pregled-korisnika-doma/korisnikDoma-getAll-response";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar-njejgovatelj',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar-njejgovatelj.component.html',
  styleUrl: './nav-bar-njejgovatelj.component.css'
})
export class NavBarNjejgovateljComponent {
  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router) {
  }
  IdiDodajZadatke() {
      this.router.navigate(['/dodajZadatke']);

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
