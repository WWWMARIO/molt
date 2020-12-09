import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { ReviewOrderModalComponent } from './review-order-modal/review-order-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OrdersComponent, ReviewOrderModalComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
