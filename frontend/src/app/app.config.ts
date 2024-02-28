import {ApplicationConfig, ErrorHandler, Injector} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {MyAuthInterceptor} from "./Helper/MyAuthInterceptor";
import { MyAuthService} from "./Services/MyAuthService";
import {ZaposlenikEndpoint} from "./Services/ZaposlenikEndpoint";
import {CustomErrorHandler, customErrorHandlerFactory, MY_ERROR_HANDLER_TOKEN} from "./Helper/CustomErrorHandler";
import {NjegovateljiService} from "./Services/NjegovateljService";
import {AutorizacijaGuard} from "./Helper/autorizacija-guard.service";


export const appConfig: ApplicationConfig = {


  providers: [
    MyAuthService,
      provideRouter(routes),
      provideAnimations(),
      { provide: HTTP_INTERCEPTORS, useClass: MyAuthInterceptor, multi: true },
      { provide: HttpHandler, useClass: MyAuthInterceptor, multi: true },
      //{ provide: MY_AUTH_SERVICE_TOKEN, useClass: MyAuthService },
      { provide: MY_ERROR_HANDLER_TOKEN, useClass: CustomErrorHandler },
      //{ provide: CustomErrorHandler, useFactory: customErrorHandlerFactory, deps: [MY_ERROR_HANDLER_TOKEN] },
    AutorizacijaGuard,
      NjegovateljiService,
      HttpClient
  ]
};
