import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {MyAuthInterceptor} from "./Helper/MyAuthInterceptor";
import {FormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {MyConfig} from "./my-config";
import {TokenService} from "./Services/TokenService";
import {MyAuthService} from "./Services/MyAuthService";
import {AlertComponent} from "./alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  private logoutSubscription!: Subscription| undefined;
  constructor(private httpClient: HttpClient,public router: Router) {}
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
    // Unsubscribe from logout HTTP request to prevent memory leaks
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    // Start the logout timer when the component initializes

    window.addEventListener('beforeunload', this.logoutOnUnload.bind(this));
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

  private logoutTimer: any;


  logoutUser(): void {
    let token = window.localStorage.getItem("my-auth-token")??"";

    // Call your logout endpoint here
    let url: string = MyConfig.adresa_servera + `/logout`;
    this.httpClient.post(url, {}, {
      headers:{
        "my-auth-token": token
      }
    }).subscribe(x=>{
      console.log("logout uspjesan")
      window.localStorage.setItem("my-auth-token","");
      this.router.navigate(['/home']);
    })

  }
  logoutOnUnload(event: BeforeUnloadEvent): void {
    // Reset the timer to prevent automatic logout if user navigates back or refreshes the page

    window.localStorage.setItem('my-auth-token', '');
    this.logoutUser(); // Perform logout when the page is unloaded
  }
}
