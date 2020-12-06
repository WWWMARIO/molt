import { IItem } from './IItem.model';
import { IOrderItem, OrderItem } from './IOrderItem.model';

export interface IOrder {
  userId: number;
  orderItems: OrderItem[];
}


export class Order implements IOrder {
  constructor(public userId: number, public orderItems: IOrderItem[]) {}


  public addItem(item: IItem) {
    const itemIndex = this.orderItems.findIndex((orderItem)=> {
      return orderItem.itemId === item.id;
    })
    if (itemIndex === -1){
      this.orderItems.push(new OrderItem(item.id,1))
    } else {
      this.orderItems[itemIndex].amount++;
    }
  }

  public removeItem(item: IItem) {
    const itemIndex = this.orderItems.findIndex((orderItem)=> {
      return orderItem.itemId === item.id;
    })
    if (itemIndex !== -1 && this.orderItems[itemIndex].amount === 1){
     this.orderItems.splice(itemIndex,1)
    } else if (itemIndex !== -1 && this.orderItems[itemIndex].amount > 1){
      this.orderItems[itemIndex].amount--;
    }
  }
}
