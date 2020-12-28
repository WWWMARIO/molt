import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Order } from 'src/app/modules/shared/models/Order.model';
import { API_BASE_URL } from 'src/environments/environment';
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root',
})
export class ApiOrderService {
  constructor(private http: HttpClient, private ordersService: OrdersService) {}

  newOrder(order: Order) {
    return this.http.post(`${API_BASE_URL}/orders`, order);
    /* .pipe(
      tap((resp) => {
        console.log(resp);
      })
    ); */
  }

  getOrders() {
    return this.http.get<Order[]>(`${API_BASE_URL}/orders`).pipe(
      tap((orders) => {
        this.ordersService.setOrders(orders);
      })
    );
  }

  getOrdersForUser(userId: number) {
    return this.http.get<Order[]>(`${API_BASE_URL}/orders/foruser/${userId}`);
  }
}
