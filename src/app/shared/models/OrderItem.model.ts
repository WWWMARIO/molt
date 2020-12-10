export class OrderItem {
  constructor(
    public itemId: number,
    public amount: number,
    public orderId?: number
  ) {}
}
