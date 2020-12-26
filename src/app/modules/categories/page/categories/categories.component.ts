import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiCategoryService } from '../../api-category.service';
import { Observable } from 'rxjs';


export interface Category {
  id?:number;
  name: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {



  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryList$: Observable<Category[]>
  constructor(private apiCategoryService: ApiCategoryService) {

  }

  ngOnInit(){
    this.apiCategoryService.refreshCategories().subscribe();
    this.categoryList$ = this.apiCategoryService.getCategories();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value: string = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      // this.categoryList.push({name: value.trim()});
      this.apiCategoryService.createCategory({name: value}).subscribe(() => {
        this.apiCategoryService.refreshCategories().subscribe();
      })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(category: Category): void {
    console.log(category.id)
    this.apiCategoryService.deleteCategory(category.id).subscribe(() => {
      this.apiCategoryService.refreshCategories().subscribe();
    })
   /*  const index = this.categoryList.indexOf(category);

    if (index >= 0) {
      this.categoryList.splice(index, 1);
    } */
  }

  editCategory(category: Category) {
    console.log(category)
  }

}
