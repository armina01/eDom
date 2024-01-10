import {ApplicationConfig, ErrorHandler} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {MyAuthInterceptor} from "./Helper/MyAuthInterceptor";
import {MY_AUTH_SERVICE_TOKEN, MyAuthService} from "./Services/MyAuthService";
import {ZaposlenikEndpoint} from "./Services/ZaposlenikEndpoint";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()
   ,{ provide: HTTP_INTERCEPTORS, useClass: MyAuthInterceptor, multi: true },
    {provide: HttpHandler,
      useClass: MyAuthInterceptor,
      multi: true,},
       { provide: MY_AUTH_SERVICE_TOKEN, useClass: MyAuthService },

        HttpClient
   ]

};
