import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar-fizioterapeut',
  standalone: true,
    imports: [
        FaIconComponent
    ],
  templateUrl: './nav-bar-fizioterapeut.component.html',
  styleUrl: './nav-bar-fizioterapeut.component.css'
})
export class NavBarFizioterapeutComponent {

  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router) {
  }
  IdiPocetna() {
    this.router.navigate(['/home']);
  }

  IdiPregledKorisnika() {
    this.router.navigate(['/pregledKorisnikaDoma']);
  }

  PregledOMeni() {
    this.router.navigate(['fizioterapeut/o-meni']);
  }

  IdiDodajTerapiju() {
    this.router.navigate(['/fizioTerapija']);
  }

  protected readonly faBell = faBell;
}
