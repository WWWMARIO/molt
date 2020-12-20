import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/Order.model';
import { ApiItemsService } from '../../../menu/services/api-items.service';
import { ApiOrderService } from '../../api-orders.service';
import { ReviewOrderModalComponent } from '../../components/edit-order-modal/review-order-modal/review-order-modal.component';
import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit /*,  AfterViewInit */ {
  displayedColumns: string[] = [
    'id',
    'total',
    'createdAt',
    'userName',
    'details',
  ];
  @ViewChild(MatSort) sort: MatSort;
  orders: Observable<Order[]>;

  dataSource = new MatTableDataSource([]);

  constructor(
    private apiOrderService: ApiOrderService,
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private apiItemsService: ApiItemsService
  ) {}

  ngOnInit(): void {
    this.apiItemsService.getItems().subscribe();
    this.orders = this.ordersService.getOrders();
    this.apiOrderService.getOrders().subscribe();
    this.orders.subscribe((response: Order[]) => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
    });
  }


  viewOrderDetails(order: Order) {
        const dialogRef = this.dialog.open(ReviewOrderModalComponent, {
          height: '90%',
          width: '90%',
          data: order
        });
        /* dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        }); */
      }

}
