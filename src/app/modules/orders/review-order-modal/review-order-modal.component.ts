import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { Item } from 'src/app/shared/models/Item.model';
import { Order } from 'src/app/shared/models/Order.model';
import { ItemsService } from '../../menu/services/items.service';
// import { CurrentOrderService } from '../../core/services/current-order.service';
// import { ItemsService } from '../../menu/services/items.service';
// import { ApiOrderService } from '../api-orders.service';

@Component({
  selector: 'app-review-order-modal',
  templateUrl: './review-order-modal.component.html',
  styleUrls: ['./review-order-modal.component.scss'],
})
export class ReviewOrderModalComponent implements OnInit {
  order: Order;

  constructor(
    // private currentOrderService: CurrentOrderService,
    // private apiOrderService: ApiOrderService,
    private itemsService: ItemsService,
    @Inject(MAT_DIALOG_DATA) public data: Order,
  ) {}

  ngOnInit(): void {
    this.order = this.data;
  }

  getItem(itemId: number) {
    return this.itemsService.getItem(itemId);
  }


}
