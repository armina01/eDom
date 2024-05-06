import { Routes} from '@angular/router';
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
import{NutricionistaComponent} from "./nutricionista/nutricionista.component";
import {TerapijaComponent} from "./terapija/terapija.component";
import {LijekComponent} from "./lijek/lijek.component";
import {NapomenaComponent} from "./napomena/napomena.component";
import {PregledNapomenaComponent} from "./pregled-napomena/pregled-napomena.component";
import {PregledAktivnihNapomenaComponent} from "./pregled-aktivnih-napomena/pregled-aktivnih-napomena.component";
import {GetZadaciComponent} from "./get-zadaci/get-zadaci.component";
import {PregledSedmicnihZadatakaComponent} from "./pregled-sedmicnih-zadataka/pregled-sedmicnih-zadataka.component";
import {DijagnozaComponent} from "./dijagnoza/dijagnoza.component";
import {DodajZadatkeComponent} from "./dodaj-zadatke/dodaj-zadatke.component";
import {PregledArhiveZadatakaComponent} from "./pregled-arhive-zadataka/pregled-arhive-zadataka.component";
import {PregledPodatakaNjegovateljComponent} from "./pregled-podataka-njegovatelj/pregled-podataka-njegovatelj.component";
import {PregledPodatakaNutricionistaComponent} from "./pregled-podataka-nutricionista/pregled-podataka-nutricionista.component";
import {PregledPodatakaDoktorComponent} from "./pregled-podataka-doktor/pregled-podataka-doktor.component";
import{DodajPlanIshraneComponent} from "./dodaj-plan-ishrane/dodaj-plan-ishrane.component";
import {Enable2FAComponent} from "./enable-2-fa/enable-2-fa.component";
import {AutorizacijaGuard} from "./Helper/autorizacija-guard.service";
import {DodajVisePlanovaComponent} from "./dodaj-vise-planova/dodaj-vise-planova.component";

export const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'pregledKorisnikaDoma', component: PregledKorisnikaDomaComponent, canActivate: [AutorizacijaGuard]},
  {path: 'opstina', component:OpstinaComponent,canActivate: [AutorizacijaGuard]},
  {path: 'korisnkDoma', component:KorisnikComponent},
  {path: 'korisnickiNalog', component:KorisnickiNalogComponent,canActivate: [AutorizacijaGuard]},
  {path: 'poslovnaPozicija', component:PoslovnaPozicijaComponent,canActivate: [AutorizacijaGuard]},
  {path:'njegovatelj',component:NjegovateljComponent,canActivate: [AutorizacijaGuard]},
  {path:'doktor',component:DoktorComponent,canActivate: [AutorizacijaGuard]},
  {path:'fizioterapeut',component:FizioterapeutComponent,canActivate: [AutorizacijaGuard]},
  {path:'dijagnoza',component:DijagnozaComponent,canActivate: [AutorizacijaGuard]},
  {path:'login',component:LogInComponent},
  {path:'home',component:HomepageComponent},
  {path:'terapija',component:TerapijaComponent},
  {path:'lijek',component:LijekComponent},
  {path:'napomena',component:NapomenaComponent},
  {path:'pregledNapomena/:id', component: PregledNapomenaComponent},
  {path:'pregledAktivnihNapomena/:id', component: PregledAktivnihNapomenaComponent},
  {path:'pregleddnevnihzadataka/:id',component:GetZadaciComponent},
  {path:'dodajZadatke',component:DodajZadatkeComponent},
  {path:'pregledsedmicnihzadataka/:id',component:PregledSedmicnihZadatakaComponent},
  {path:'pregledarhivezadataka/:id',component:PregledArhiveZadatakaComponent},
  {path:'njegovatelj/o-meni',component:PregledPodatakaNjegovateljComponent},
  {path:'nutricionista/o-meni',component:PregledPodatakaNutricionistaComponent},
  {path:'doktor/o-meni',component:PregledPodatakaDoktorComponent},
  {path: 'nutricionista',component:NutricionistaComponent},
  {path:'home',component:HomepageComponent,canActivate: [AutorizacijaGuard]},
  {path:'pregleddnevnihzadataka/:id',component:GetZadaciComponent,canActivate: [AutorizacijaGuard]},

  {path:'pregledsedmicnihzadataka/:id',component:PregledSedmicnihZadatakaComponent,canActivate: [AutorizacijaGuard]},
  {path:'pregledarhivezadataka/:id',component:PregledArhiveZadatakaComponent,canActivate: [AutorizacijaGuard]},
  {path:'njegovatelj/o-meni',component:PregledPodatakaNjegovateljComponent,canActivate: [AutorizacijaGuard]},
  {path:'nutricionista/o-meni',component:PregledPodatakaNutricionistaComponent,canActivate: [AutorizacijaGuard]},
  {path:'dodajplanishrane/:id',component:DodajPlanIshraneComponent,canActivate: [AutorizacijaGuard]},
  {path:'autorizacija',component:Enable2FAComponent},
  {path:'dodajPlanoveIshrane', component: DodajVisePlanovaComponent,canActivate: [AutorizacijaGuard]}
]





