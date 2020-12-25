import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users$ = new BehaviorSubject<User[]>([]);

  constructor() {}

  setUsers(users: User[]) {
    this.users$.next(users);
  }

  getUsers() {
    return this.users$.asObservable();
  }

  getUser(userId: number) {
    return this.users$.pipe(
      map((users) => {
        return users.find((user: User) => {
          return user.id === userId;
        });
      })
    );
  }
}
