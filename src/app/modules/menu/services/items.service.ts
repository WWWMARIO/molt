import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../../shared/models/Item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items$ = new BehaviorSubject<Item[]>([]);

  constructor() {}

  setItems(newItems: Item[]) {
    this.items$.next(newItems);
  }

  getItems() {
    return this.items$.asObservable();
  }

  getItem(itemId: number) {
    return this.items$.pipe(
      map((items) => {
        return items.find((item) => {
          return item.id === itemId;
        });
      })
    );
  }

  getItemsForCategory(categoryId: number) {
    return this.items$.pipe(
      map((items) => {
        return items.filter((item) => {
          return item.categoryId === categoryId;
        });
      })
    );
  }
}
