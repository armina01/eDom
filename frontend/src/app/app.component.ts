import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {MyAuthInterceptor} from "./Helper/MyAuthInterceptor";
import {FormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {MyConfig} from "./my-config";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  private logoutSubscription!: Subscription;

  constructor(private httpClient: HttpClient) {}
  ngOnDestroy(): void {
    // Unsubscribe from logout HTTP request to prevent memory leaks
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
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
