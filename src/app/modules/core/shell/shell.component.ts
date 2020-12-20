import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { EditOrderModalComponent } from '../../orders/edit-order-modal/edit-order-modal.component';
import { ReviewOrderModalComponent } from '../../orders/review-order-modal/review-order-modal.component';
import { CurrentOrderService } from '../services/current-order.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  numberOfItemsOnOrder$: Observable<number>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private currentOrderService: CurrentOrderService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.numberOfItemsOnOrder$ = this.currentOrderService.getTotalNumberOfItemsOnOrder();
  }

  viewOrder() {
    this.numberOfItemsOnOrder$.pipe(take(1)).subscribe((number) => {
      if (number > 0) {
        const dialogRef = this.dialog.open(EditOrderModalComponent, {
          height: '90%',
          width: '90%',
        });
        /* dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        }); */
      } else {
        this.snackbar.open('Order is empty', '', {
          duration: 3000,
        });
      }
    });
  }
}
