import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuItemFilterPipe } from './menu-item-filter.pipe';

@NgModule({
  declarations: [MenuComponent, EditItemComponent, MenuItemFilterPipe],
  imports: [CommonModule, MenuRoutingModule, SharedModule],
})
export class MenuModule {}
