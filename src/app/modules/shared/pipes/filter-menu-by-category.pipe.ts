import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../categories/page/categories/categories.component';
import { Item } from '../models/Item.model';

@Pipe({
  name: 'filterMenuByCategory',
})
export class FilterMenuByCategoryPipe implements PipeTransform {
  transform(menuItems: Item[], category: Category): Item[] {
    if (!category) {
      return menuItems;
    }
    if (menuItems.length === 0) {
      return [];
    }
    return menuItems.filter((item: Item) => {
      return item.categoryId === category.id;
    });
  }
}

