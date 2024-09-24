import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {MyAuthInterceptor} from "./Helper/MyAuthInterceptor";
import {FormsModule} from "@angular/forms";
import {interval, Subscription, takeWhile} from "rxjs";
import {MyConfig} from "./my-config";
import {TokenService} from "./Services/TokenService";
import {MyAuthService} from "./Services/MyAuthService";
import {AlertComponent} from "./alert/alert.component";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule, FormsModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit, OnDestroy{
  title = 'frontend';
  private logoutSubscription!: Subscription;

  private refreshSubscription: Subscription | undefined;
  constructor(private httpClient: HttpClient,private tokenService: TokenService, private myAuth:MyAuthService) {}

  ngOnInit(): void {
    const oldToken = this.myAuth.getAuthorizationToken()?.vrijednost;
    console.log('Početak intervala za provjeru tokena');
    if (oldToken) {
      this.refreshSubscription = interval( 45*60* 1000) //svakih 30 sec  30 * 1000
        .pipe(
          takeWhile(() => this.myAuth.isLogiran())
        )
        .subscribe((resp) => {
          this.tokenService.refreshAuthToken(oldToken).subscribe();
          console.log('Provjera tokena završena. Odgovor: ', resp);
        });
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe from logout HTTP request to prevent memory leaks dodalo samo
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }

    if (this.refreshSubscription) { //dodala ja
      this.refreshSubscription.unsubscribe();
    }
  }

  logout(): void {
    const token = window.localStorage.getItem('my-auth-token') ?? '';
    window.localStorage.setItem('my-auth-token', ''); // Clear token from local storage
    const url = MyConfig.adresa_servera + '/logout';
    const headers = new HttpHeaders().set('my-auth-token', token);

    // Make HTTP POST request to logout endpoint
    this.logoutSubscription = this.httpClient.post(url, {}, { headers }).subscribe(
      () => {
        console.log('Logout successful');
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
}
