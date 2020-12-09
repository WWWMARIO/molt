import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderService } from '../../core/services/order.service';
import { MenuService } from '../../menu/menu.service';

@Component({
  selector: 'app-review-order-modal',
  templateUrl: './review-order-modal.component.html',
  styleUrls: ['./review-order-modal.component.scss'],
})
export class ReviewOrderModalComponent implements OnInit {
  order$: Observable<Order>;

  constructor(
    private orderService: OrderService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.order$ = this.orderService.getOrder();
  }

  getItem(itemId: number) {
    return this.menuService.getItem(itemId);
  }
}
