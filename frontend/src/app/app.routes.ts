import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {PregledKorisnikaDomaComponent} from "./pregled-korisnika-doma/pregled-korisnika-doma.component";
import {OpstinaComponent} from "./opstina/opstina.component";
import {KorisnickiNalogComponent} from "./korisnicki-nalog/korisnicki-nalog.component";
import {KorisnikComponent} from "./korisnik/korisnik.component";
import {PoslovnaPozicijaComponent} from "./poslovna-pozicija/poslovna-pozicija.component";

export const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'pregledKorisnikaDoma', component: PregledKorisnikaDomaComponent},
  {path: 'opstina', component:OpstinaComponent},
  {path: 'korisnkDoma', component:KorisnikComponent},
  {path: 'korisnickiNalog', component:KorisnickiNalogComponent},
  {path: 'poslovnaPozicija', component:PoslovnaPozicijaComponent}
];


