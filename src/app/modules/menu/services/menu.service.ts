import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/Item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu$ = new BehaviorSubject<Item[]>([]);

  constructor() {}

  setMenu(items: Item[]) {
    this.menu$.next(items);
  }

  getMenu() {
    return this.menu$.asObservable();
  }

  getItem(itemId: number) {
    return this.menu$.pipe(
      map((items) => {
        return items.find((item) => {
          return item.id === itemId;
        });
      })
    );
  }
}
