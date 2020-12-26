import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from 'src/environments/environment';
import { User } from '../../shared/models/User.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

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
  user: User;

  constructor(
    private http: HttpClient,
    private router: Router) {}



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
    localStorage.setItem('logInInfo', JSON.stringify(logInInfo))
  }

  getStoredLogInInfo(): string {
    return localStorage.getItem('logInInfo');
  }


  logIn(reqBody: { email: string; password: string }) {
    return this.http
      .post<LogInInfo>(`${API_BASE_URL}/login`, reqBody)
      .pipe(tap((logInInfo: LogInInfo) => {
        this.storeLogInInfo(logInInfo)
      }));
  }

  logOut (){
    localStorage.removeItem('logInInfo');
    this.router.navigate(['/welcome'])
  }
}
