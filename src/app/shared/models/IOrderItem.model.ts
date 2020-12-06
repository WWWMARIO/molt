export interface IOrderItem {
  itemId: number;
  amount: number;
  orderId?: number;
}


export class OrderItem implements IOrderItem {
  constructor (public itemId: number, public amount: number){}
}
