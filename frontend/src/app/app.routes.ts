import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {DodajOpstinuComponent} from "./dodaj-opstinu/dodaj-opstinu.component";
import {PregledKorisnikaDomaComponent} from "./pregled-korisnika-doma/pregled-korisnika-doma.component";

export const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'dodaj-opstinu', component: DodajOpstinuComponent},
  {path: 'pregledKorisnikaDoma', component: PregledKorisnikaDomaComponent}
];


