import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  logIn(reqBody: {email: string, password: string}) {
    return this.http.post(`${API_BASE_URL}/login`, reqBody);
  }
}
