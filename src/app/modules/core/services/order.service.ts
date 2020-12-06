import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IItem } from 'src/app/shared/models/IItem.model';
import { IOrderItem } from 'src/app/shared/models/IOrderItem.model';
import { IOrder, Order } from 'src/app/shared/models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order = new BehaviorSubject <Order>(new Order(11,[]));

  constructor() { }

  getOrder() {
    return this.order.getValue();
  }




  getTotalNumberOfItemsOnOrder(){
    return this.order.pipe(map((order: Order)=> {
      return  order.orderItems.reduce((total: number, oItem ) => {
        return total + oItem.amount;
      },0)
    }))
  }

  getItemAmount(item: IItem){
    return this.order.pipe(map((order: Order)=> {
      const orderItem =  order.orderItems.find((orderItem: IOrderItem ) => {
        return orderItem.itemId === item.id;
      })
      if (orderItem) {
        return orderItem.amount;
      } else {
        return 0;
      }
    }))
  }



  addToOrder(item: IItem) {
    const order = this.order.getValue();
    order.addItem(item);
    this.order.next(order);

  }

  removeFromOrder(item: IItem) {
    const order = this.order.getValue();
    order.removeItem(item);
    this.order.next(order);
  }
}
