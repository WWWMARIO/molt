import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from 'src/environments/environment';
import { Category } from './page/categories/categories.component';


@Injectable({
  providedIn: 'root',
})
export class ApiCategoryService {
  categories$ = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {}


  getCategories(){
    return this.categories$.asObservable();
  }


  refreshCategories() {
    return this.http.get<Category[]>(`${API_BASE_URL}/categories`).pipe(
      tap((categories) => {
        this.categories$.next(categories);
      })
    );
  }

  createCategory(category: Category) {
    return this.http.post(`${API_BASE_URL}/categories`, category);
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${API_BASE_URL}/categories/${categoryId}`);
  }
}

/* getUsers() {
  return this.http.get<User[]>(`${API_BASE_URL}/users`).pipe(
    tap((users) => {
      this.usersService.setUsers(users);
    })
  );
}

getUser(userId: number) {
  // const params = new HttpParams().set('id', userId.toString())
  return this.http.get<User>(`${API_BASE_URL}/users/${userId}`/* , {params: params} */

/* updateUser(user: User) {
  // const params = new HttpParams().set('id', userId.toString())
  console.log(user)
  return this.http.put<User>(`${API_BASE_URL}/users`, user/)
}
 */
