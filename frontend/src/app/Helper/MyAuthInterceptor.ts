import {Injectable, Injector} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {MyAuthService} from '../Services/MyAuthService';

@Injectable({ providedIn: 'root' })
export class MyAuthInterceptor implements HttpInterceptor {

  private authService: MyAuthService| null = null;

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Lazy-load the service to avoid circular dependency
    if (!this.authService) {
      this.authService = this.injector.get(MyAuthService);
    }

    // Get the auth token from the service.
    const authToken = this.authService.getAuthorizationToken()?.vrijednost ?? "";


    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: {
        'my-auth-token': authToken
      }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
