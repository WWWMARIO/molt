import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/Item.model';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderItem } from 'src/app/shared/models/OrderItem.model';
import { ItemsService } from '../../menu/services/items.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentOrderService {
  private order = new BehaviorSubject<Order>(new Order(60, []));

  constructor(private itemsService: ItemsService) {}

  getOrder() {
    return this.order.asObservable();
  }

  getTotalNumberOfItemsOnOrder() {
    return this.order.pipe(
      map((order: Order) => {
        return order.orderItems.reduce((total: number, oItem) => {
          return total + oItem.amount;
        }, 0);
      })
    );
  }

  getItemAmount(item: Item) {
    return this.order.pipe(
      map((order: Order) => {
        const orderItem = order.orderItems.find((orderItem: OrderItem) => {
          return orderItem.itemId === item.id;
        });
        if (orderItem) {
          return orderItem.amount;
        } else {
          return 0;
        }
      })
    );
  }

  getTotal() {
    return combineLatest([this.itemsService.getItems(), this.getOrder()]).pipe(
      map(([menu, order]) => {
        return order.orderItems.reduce((total, item) => {
          const price = menu.find((i) => {
            return i.id === item.itemId;
          }).price;
          return total + price * item.amount;
        }, 0);
      })
    );
  }

  addToOrder(item: Item) {
    const order = this.order.getValue();
    order.addItem(item);
    this.order.next(order);
  }

  removeFromOrder(item: Item) {
    const order = this.order.getValue();
    order.removeItem(item);
    this.order.next(order);
  }
}
