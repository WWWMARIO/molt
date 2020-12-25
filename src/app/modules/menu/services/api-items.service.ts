import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Item } from 'src/app/modules/shared/models/Item.model';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root',
})
export class ApiItemsService {
  constructor(private http: HttpClient, private itemsService: ItemsService) {}

  getItems() {
    return this.http.get<Item[]>(`${API_BASE_URL}/items`).pipe(
      tap((items) => {
        this.itemsService.setItems(items);
      })
    );
  }

  updateItem(updatedItem: Item) {
    return this.http.put(`${API_BASE_URL}/items`, updatedItem);
  }

  deleteItem(itemId: string) {
    return this.http.delete(`${API_BASE_URL}/items/${itemId}`);
  }

  createItem(newItem: Item) {
    return this.http.post(`${API_BASE_URL}/items/`, newItem);
  }
}
