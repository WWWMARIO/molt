import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from 'src/environments/environment';
import { IItem } from 'src/app/shared/models/IItem.model';
import { MenuService } from './menu.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiMenuService {
  constructor(private http: HttpClient, private menuService: MenuService) {}

  getItems() {
    return this.http.get<IItem[]>(`${API_BASE_URL}/items`).pipe(
      tap((items) => {
        this.menuService.setMenu(items);
      })
    );
  }
}
