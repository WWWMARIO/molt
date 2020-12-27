import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Item } from 'src/app/modules/shared/models/Item.model';
import { Order } from 'src/app/modules/shared/models/Order.model';
import { CurrentOrderService } from '../../../core/services/current-order.service';
import { ItemsService } from '../../../menu/services/items.service';
import { ApiOrderService } from '../../api-orders.service';

@Component({
  selector: 'app-edit-order-modal',
  templateUrl: './edit-order-modal.component.html',
  styleUrls: ['./edit-order-modal.component.scss'],
})
export class EditOrderModalComponent implements OnInit {
  order$: Observable<Order>;

  constructor(
    private currentOrderService: CurrentOrderService,
    private apiOrderService: ApiOrderService,
    private itemsService: ItemsService,
    private dialogRef: MatDialogRef<EditOrderModalComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.order$ = this.currentOrderService.getOrder();
  }

  getItem(itemId: number) {
    return this.itemsService.getItem(itemId);
  }

  getTotal() {
    return this.currentOrderService.getTotal();
  }

  addToOrder(item: Item) {
    this.currentOrderService.addToOrder(item);
  }

  removeFromOrder(item: Item) {
    this.currentOrderService.removeFromOrder(item);
  }

  confirmOrder(order: Order) {
    this.apiOrderService.newOrder(order).subscribe(()=> {
      this.dialogRef.close();
      this.snackBar.open('Thank you for your order', 'Close', {
        duration: 3000,
      });
      this.currentOrderService.resetOrder();
    });
  }
}
