import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ApiItemsService } from 'src/app/modules/menu/services/api-items.service';
import { ReviewOrderModalComponent } from '../../../orders/components/edit-order-modal/review-order-modal/review-order-modal.component';
import { Order } from '../../models/Order.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  @Input() orders$: Observable<Order[]>;
  ordersSub: Subscription;

  displayedColumns: string[] = [
    'id',
    'total',
    'createdAt',
    'userName',
    'details',
  ];
  @ViewChild(MatSort) sort: MatSort;


  dataSource = new MatTableDataSource([]);

  constructor(
    private dialog: MatDialog,
    private apiItemsService: ApiItemsService) { }

  ngOnInit(): void {
    this.apiItemsService.getItems().subscribe();
    this.ordersSub = this.orders$.subscribe((response: Order[]) => {
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

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

}
