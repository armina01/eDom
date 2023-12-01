import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
// @ts-ignore
import {DodajOpstinuComponent} from "./dodaj-opstinu/dodaj-opstinu.component";
import {PregledKorisnikaDomaComponent} from "./pregled-korisnika-doma/pregled-korisnika-doma.component";
import {LogInComponent} from "./log-in/log-in.component";
import {KorisnickiNalogComponent} from "./korisnicki-nalog/korisnicki-nalog.component";
import {PoslovnaPozicijaComponent} from "./poslovna-pozicija/poslovna-pozicija.component";

export const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path:'login',component:LogInComponent},
  {path:'dodajNalog',component:KorisnickiNalogComponent},
 // {path: 'dodaj-opstinu', component: DodajOpstinuComponent},
  {path: 'pregledKorisnikaDoma', component: PregledKorisnikaDomaComponent},
  {path:'poslovnaPozicija', component:PoslovnaPozicijaComponent}
];


