import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  LogInInfo,
  LoginService,
} from '../modules/core/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const wantedRoute = state.url.split('/');
    wantedRoute.shift();
    // const userRole = await this.loginService.loggedInUser$.toPromise().then(()=> {console.log("done")});
    console.log(wantedRoute);
    // console.log(userRole)
    const logInInfo: LogInInfo = JSON.parse(localStorage.getItem('logInInfo'));

    if (!this.loginService.isTokenValid()) {
      return false;
    }

    return this.checkUserAndRoute(logInInfo, wantedRoute);
  }

  checkUserAndRoute(logInInfo: LogInInfo, wantedRoute: string[]): boolean {
       switch (wantedRoute[0]) {
      case 'users': {
        if (logInInfo.role === 'admin') {
          return true;
        } else if (logInInfo.role === 'guest') {
          return logInInfo.id === Number(wantedRoute[1]);
        }
        break;
      }
      case 'menu': {
        if (logInInfo.role === 'admin' || logInInfo.role === 'guest') {
          return true;
        }
        break;
      }
      case 'orders': {
        if (logInInfo.role === 'admin') {
          return true;
        }
        break;
      }
      case 'categories': {
        console.log('cat');
        if (logInInfo.role === 'admin') {
          return true;
        }
        break;
      }

      default: {
        return false;
      }
    }
  }
}
