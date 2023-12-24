import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {PregledKorisnikaDomaComponent} from "./pregled-korisnika-doma/pregled-korisnika-doma.component";
import {OpstinaComponent} from "./opstina/opstina.component";
import {KorisnickiNalogComponent} from "./korisnicki-nalog/korisnicki-nalog.component";
import {KorisnikComponent} from "./korisnik/korisnik.component";
import {PoslovnaPozicijaComponent} from "./poslovna-pozicija/poslovna-pozicija.component";
import {NjegovateljComponent} from "./njegovatelj/njegovatelj.component";
import {DoktorComponent} from "./doktor/doktor.component";
import {FizioterapeutComponent} from "./fizioterapeut/fizioterapeut.component";
import{LogInComponent} from "./log-in/log-in.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MyAuthInterceptor} from "./Helper/MyAuthInterceptor";
import {MyAuthService} from "./Services/MyAuthService";
import {FormsModule} from "@angular/forms";

import {DijagnozaComponent} from "./dijagnoza/dijagnoza.component";
import {TerapijaComponent} from "./terapija/terapija.component";
import {LijekComponent} from "./lijek/lijek.component";


export const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'pregledKorisnikaDoma', component: PregledKorisnikaDomaComponent},
  {path: 'opstina', component:OpstinaComponent},
  {path: 'korisnkDoma', component:KorisnikComponent},
  {path: 'korisnickiNalog', component:KorisnickiNalogComponent},
  {path: 'poslovnaPozicija', component:PoslovnaPozicijaComponent},
  {path:'njegovatelj',component:NjegovateljComponent},
  {path:'doktor',component:DoktorComponent},
  {path:'fizioterapeut',component:FizioterapeutComponent},
  {path:'dijagnoza',component:DijagnozaComponent},
  {path:'login',component:LogInComponent},
  {path:'home',component:HomepageComponent},
  {path:'terapija',component:TerapijaComponent},
  {path:'lijek',component:LijekComponent}
]





