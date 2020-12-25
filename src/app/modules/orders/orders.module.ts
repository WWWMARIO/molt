import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReviewOrderModalComponent } from './components/edit-order-modal/review-order-modal/review-order-modal.component';
import { SharedModule } from '../shared/shared.module';
import { EditOrderModalComponent } from './components/edit-order-modal/edit-order-modal.component';

@NgModule({
  declarations: [
    OrdersComponent,
    ReviewOrderModalComponent,
    EditOrderModalComponent,
  ],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
