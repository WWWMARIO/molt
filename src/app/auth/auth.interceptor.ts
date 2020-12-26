import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogInInfo, LoginService } from '../modules/core/services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('/login') || request.url.includes('/signup') || request.url.includes('/welcome')) {
      return next.handle(request);
    } else {
      const storedLoginInfo: LogInInfo = JSON.parse (this.loginService.getStoredLogInInfo());
      const authRequest = request.clone({ setHeaders: { Authorization: 'Bearer ' + storedLoginInfo.token } });
      return next.handle(authRequest);
    }




  }
}
