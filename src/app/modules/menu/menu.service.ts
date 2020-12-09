import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IItem } from 'src/app/shared/models/IItem.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu$ = new BehaviorSubject<IItem[]>([]);

  constructor() {}

  setMenu(items: IItem[]) {
    this.menu$.next(items);
  }

  getMenu() {
    return this.menu$.asObservable;
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
