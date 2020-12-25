import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CurrentOrderService } from 'src/app/modules/core/services/current-order.service';
import { Item } from 'src/app/modules/shared/models/Item.model';
import { EditItemComponent } from '../../components/edit-item/edit-item.component';
import { ApiItemsService } from '../../services/api-items.service';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItems: Observable<Item[]>;

  constructor(
    private apiItemsService: ApiItemsService,
    private itemsService: ItemsService,
    private currentOrderService: CurrentOrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiItemsService.getItems().subscribe();
    this.menuItems = this.itemsService.getItems();
  }

  getItemAmount(item: Item) {
    return this.currentOrderService
      .getItemAmount(item)
      .pipe(distinctUntilChanged());
  }

  addToOrder(item: Item) {
    this.currentOrderService.addToOrder(item);
  }

  removeFromOrder(item: Item) {
    this.currentOrderService.removeFromOrder(item);
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(EditItemComponent, {
      // height: '90%',
      width: '90%',
      data: item,
    });
    /* dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

  newItem() {
    const dialogRef = this.dialog.open(EditItemComponent, {
      // height: '90%',
      width: '90%',
    });
  }
}
