import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { OrderService } from 'src/app/modules/core/services/order.service';
import { Item } from 'src/app/shared/models/Item.model';
import { EditItemComponent } from '../../components/edit-item/edit-item.component';
import { ApiMenuService } from '../../services/api-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItems: Observable<Item[]>;

  constructor(
    private apiMenuService: ApiMenuService,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.menuItems = this.apiMenuService.getItems();
  }

  getItemAmount(item: Item) {
    return this.orderService.getItemAmount(item).pipe(distinctUntilChanged());
  }

  addToOrder(item: Item) {
    this.orderService.addToOrder(item);
  }

  removeFromOrder(item: Item) {
    this.orderService.removeFromOrder(item);
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(EditItemComponent, {
      height: '90%',
      width: '90%',
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  newItem() {}
}
