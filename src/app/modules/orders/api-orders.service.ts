import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/Order.model';
import { API_BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiOrderService {
  constructor(private http: HttpClient) {}

  newOrder(order: Order) {
    return this.http.post(`${API_BASE_URL}/orders`, order).pipe(
      tap((resp) => {
        console.log(resp);
      })
    );
  }

  getOrders() {
    return this.http.get<Order[]>(`${API_BASE_URL}/orders`).pipe(
      tap((items) => {
        this.orderService.setItems(items);
      })
    );
  }

  getItems() {}
}
