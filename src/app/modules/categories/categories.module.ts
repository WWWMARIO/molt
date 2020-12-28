import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './page/categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';


@NgModule({
  declarations: [CategoriesComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
