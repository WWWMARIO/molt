import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiCategoryService } from '../../api-category.service';
import { Category } from '../../page/categories/categories.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  category: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    private apiCategoryService: ApiCategoryService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.category = this.formBuilder.group({
      name: [this.data.name, [Validators.required]],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onEdit() {
    if (this.category.valid) {
      this.apiCategoryService
        .updateCategory({ id: this.data.id, name: this.category.value.name })
        .subscribe(() => {
          this.apiCategoryService.refreshCategories().subscribe();
          this.snackbar.open('Category updated', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close();
        });
    }
  }
}
