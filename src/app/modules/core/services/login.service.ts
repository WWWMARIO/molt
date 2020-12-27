import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, tap } from 'rxjs/operators';
import { API_BASE_URL } from 'src/environments/environment';
import { User } from '../../shared/models/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CurrentOrderService } from './current-order.service';

export interface LogInInfo {
  email: string;
  id: number;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private loggedInUser = new BehaviorSubject<LogInInfo>(undefined);

  constructor(
    private http: HttpClient, private router: Router,
    private currentOrderService: CurrentOrderService) {
    const userInfo: string = localStorage.getItem('logInInfo');
    if (userInfo) {
      this.loggedInUser.next(JSON.parse(userInfo));
    }
  }

  public get loggedInUser$ () {
    return this.loggedInUser;
  }

  isTokenValid(): boolean {
    // get the token
    const logInInfo: LogInInfo = JSON.parse(this.getStoredLogInInfo());
    const helper = new JwtHelperService();
    /* const decodedToken = helper.decodeToken(logInInfo.token);
    console.log(decodedToken)
    const expirationDate = helper.getTokenExpirationDate(logInInfo.token);
    console.log(expirationDate)
    const isExpired = helper.isTokenExpired(logInInfo.token);
    console.log(isExpired) */

    return !helper.isTokenExpired(logInInfo.token);
  }

  storeLogInInfo(logInInfo: LogInInfo) {
    localStorage.setItem('logInInfo', JSON.stringify(logInInfo));
  }

  getStoredLogInInfo(): string {
    return localStorage.getItem('logInInfo');
  }

  logIn(reqBody: { email: string; password: string }) {
    return this.http.post<LogInInfo>(`${API_BASE_URL}/login`, reqBody).pipe(
      tap((logInInfo: LogInInfo) => {
        this.loggedInUser.next(logInInfo);
        this.storeLogInInfo(logInInfo);
        this.currentOrderService.resetOrder(logInInfo.id)
      })
    );
  }

  logOut() {
    localStorage.removeItem('logInInfo');
    this.router.navigate(['/welcome']);
  }

  signUp(user: User) {
    return this.http.post(`${API_BASE_URL}/signup`, user).pipe(
      mergeMap(() => {
        return this.logIn({ email: user.email, password: user.password });
      })
    );
  }
}
