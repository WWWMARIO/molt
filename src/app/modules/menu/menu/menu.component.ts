import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { IItem } from 'src/app/shared/models/IItem.model';
import { OrderService } from '../../core/services/order.service';
import { ApiMenuServiceService } from '../api-menu-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: Observable<IItem[]>;


  constructor(
    private apiMenuService: ApiMenuServiceService,
    private orderService: OrderService

    ) { }

  ngOnInit(): void {
    this.menuItems = this.apiMenuService.getItems();
  }

  getItemAmount(item: IItem) {
    return this.orderService.getItemAmount(item).pipe(distinctUntilChanged())
  }


  addToOrder(item: IItem) {
    this.orderService.addToOrder(item);
  }

  removeFromOrder(item: IItem) {
    this.orderService.removeFromOrder(item);
  }
}
