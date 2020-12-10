import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/Item.model';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderService } from '../../core/services/order.service';
import { MenuService } from '../../menu/services/menu.service';
import { ApiOrderService } from '../api-orders.service';

@Component({
  selector: 'app-review-order-modal',
  templateUrl: './review-order-modal.component.html',
  styleUrls: ['./review-order-modal.component.scss'],
})
export class ReviewOrderModalComponent implements OnInit {
  order$: Observable<Order>;

  constructor(
    private orderService: OrderService,
    private apiOrderService: ApiOrderService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.order$ = this.orderService.getOrder();
  }

  getItem(itemId: number) {
    return this.menuService.getItem(itemId);
  }

  getTotal() {
    return this.orderService.getTotal();
  }

  addToOrder(item: Item) {
    this.orderService.addToOrder(item);
  }

  removeFromOrder(item: Item) {
    this.orderService.removeFromOrder(item);
  }

  confirmOrder(order: Order) {
    this.apiOrderService.newOrder(order).subscribe();
  }
}
