import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { ApiOrderService } from '../api-orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Observable<>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiOrderService: ApiOrderService) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
}
