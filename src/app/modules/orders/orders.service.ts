import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/Order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private orders$ = new BehaviorSubject<Order[]>([]);

  constructor() {}

  setOrders(orders: Order[]) {
    this.orders$.next(orders);
  }

  getOrders() {
    return this.orders$.asObservable();
  }

  getOrder(orderId: number) {
    return this.orders$.pipe(
      map((orders) => {
        return orders.find((order: Order) => {
          return order.id === orderId;
        });
      })
    );
  }

  /* private menu$ = new BehaviorSubject<Item[]>([]);

  constructor() {}

  setItems(items: Item[]) {
    this.menu$.next(items);
  }

  getItems() {
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
  } */
}
