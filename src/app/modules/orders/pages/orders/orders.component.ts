import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/modules/shared/models/Order.model';
import { ApiOrderService } from '../../api-orders.service';
import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit /*,  AfterViewInit */ {
  orders$: Observable<Order[]>;

  constructor(
    private apiOrderService: ApiOrderService,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.apiOrderService.getOrders().subscribe();
    this.orders$ = this.ordersService.getOrders();
  }




}
