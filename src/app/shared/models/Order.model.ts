import { Item } from './Item.model';
import { User } from './User.model';
import { OrderItem } from './OrderItem.model';



export class Order {
  constructor(
    public userId: number,
    public orderItems: OrderItem[],
    public id?: number,
    public user?: User,
    public total?: number,
    public createdAt?: Date
  ) {}

  public addItem(item: Item) {
    const itemIndex = this.orderItems.findIndex((orderItem) => {
      return orderItem.itemId === item.id;
    });
    if (itemIndex === -1) {
      this.orderItems.push(new OrderItem(item.id, 1));
    } else {
      this.orderItems[itemIndex].amount++;
    }
  }

  public removeItem(item: Item) {
    const itemIndex = this.orderItems.findIndex((orderItem) => {
      return orderItem.itemId === item.id;
    });
    if (itemIndex !== -1 && this.orderItems[itemIndex].amount === 1) {
      this.orderItems.splice(itemIndex, 1);
    } else if (itemIndex !== -1 && this.orderItems[itemIndex].amount > 1) {
      this.orderItems[itemIndex].amount--;
    }
  }
}
