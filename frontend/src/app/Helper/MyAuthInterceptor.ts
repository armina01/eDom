import {Injectable, Injector} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {MyAuthService} from '../Services/MyAuthService';

@Injectable({ providedIn: 'root' })
export class MyAuthInterceptor implements HttpInterceptor {

  private authService: MyAuthService| null = null;

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (!this.authService) {
      this.authService = this.injector.get(MyAuthService);
    }
    const authToken = this.authService.getAuthorizationToken()?.vrijednost ?? "";


    const authReq = req.clone({
      setHeaders: {
        'my-auth-token': authToken
      }
    });

    return next.handle(authReq);
  }
}
