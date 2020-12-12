import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/models/Item.model';
import { ApiItemsService } from '../../services/api-items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit {
  loading = false;
  itemForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private formBuilder: FormBuilder,
    private apiItemsService: ApiItemsService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.itemForm = this.formBuilder.group({
        id: this.data.id,
        name: [this.data.name, [Validators.required]],
        price: [this.data.price, [Validators.required, Validators.min(0.01)]],
        description: [this.data.description, [Validators.required]],
        picture: [this.data.picture, [Validators.required]],
      });
    } else {
      this.itemForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        description: ['', [Validators.required]],
        picture: [
          'https://derdafoods.com/static/backend/img/meal-placeholder.jpg',
          [Validators.required],
        ],
      });
    }
  }

  onSave() {
    console.log(this.data);
    if (this.itemForm.valid && this.data) {
      this.loading = true;
      this.apiItemsService.updateItem(this.itemForm.value).subscribe((resp) => {
        this.apiItemsService.getItems().subscribe(() => {
          this.dialogRef.close();
        });
      });
    } else if (this.itemForm.valid && !this.data) {
      this.apiItemsService.createItem(this.itemForm.value).subscribe((resp) => {
        this.apiItemsService.getItems().subscribe(() => {
          this.dialogRef.close();
        });
      });
    }
  }

  onDelete() {
    this.apiItemsService
      .deleteItem(this.itemForm.controls.id.value)
      .subscribe(() => {
        this.apiItemsService.getItems().subscribe(() => {
          this.dialogRef.close();
        });
      });
  }
}
