import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../categories/page/categories/categories.component';
import { Item } from '../shared/models/Item.model';

@Pipe({
  name: 'menuItemFilter'
})
export class MenuItemFilterPipe implements PipeTransform {

  transform(menuItems: Item[], categories: Category[]): unknown {
    if (categories?.length === 0) {
      return [];
    }
    if (menuItems.length === 0) {
      return [];
    }

    return menuItems.filter((menuItem)=>{
      return categories?.some((category)=> {
        return menuItem.categoryId === category.id
      })
    })

  }

}
