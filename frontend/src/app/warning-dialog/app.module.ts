import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MyAuthInterceptor} from "../Helper/MyAuthInterceptor";
@NgModule({
    declarations: [

    ],

    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: MyAuthInterceptor, multi: true },

    ],
})
export class AppModule { }
