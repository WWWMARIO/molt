import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  numberOfItemsOnOrder$: Observable<number>;

  constructor(private orderService: OrderService ) { }

  ngOnInit(): void {
    this.numberOfItemsOnOrder$ = this.orderService.getTotalNumberOfItemsOnOrder();
  }

  viewOrder() {
    console.log(this.orderService.getOrder())
  }



}
