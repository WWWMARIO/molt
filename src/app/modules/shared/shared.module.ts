import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { MatChipsModule } from '@angular/material/chips';

import { MatMenuModule } from '@angular/material/menu';


import {MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatMenuModule,
    MatSidenavModule,

  ],
  exports: [
    CommonModule,

    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    OrdersListComponent,
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule
  ],
})
export class SharedModule {}
