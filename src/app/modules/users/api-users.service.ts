import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/User.model';
import { API_BASE_URL } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService) { }


  getUsers() {
    return this.http.get<User[]>(`${API_BASE_URL}/users`).pipe(
      tap((users) => {
        this.usersService.setUsers(users);
      })
    );
  }

  getUser(userId: number) {
    // const params = new HttpParams().set('id', userId.toString())
    return this.http.get<User>(`${API_BASE_URL}/users/${userId}`/* , {params: params} */)
  }
}
