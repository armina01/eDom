import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
    imports: [CommonModule, FaIconComponent],
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.css'
})
export class NavBarAdminComponent {
  constructor(public httpClient:HttpClient, private dialog: MatDialog,public router: Router) {
  }
  Odjava() {
    this.router.navigate(['/home']);
  }
  IdiPocetna() {
    this.router.navigate(['/admin-home']);
  }

  IdiPregledKorisnika() {
    this.router.navigate(['/njegovatelj']);
  }

  IdiDodajZadatke() {
    this.router.navigate(['/nutricionista']);
  }
}
