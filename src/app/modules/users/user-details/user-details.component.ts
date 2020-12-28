import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiOrderService } from '../../orders/api-orders.service';
import { Order } from '../../shared/models/Order.model';
import { User } from '../../shared/models/User.model';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: Observable<User>;
  userForm: FormGroup;
  userId: number;
  loading = false;

  userOrders$: Observable<Order[]>;

  constructor(
    private route: ActivatedRoute,
    private apiUsersService: ApiUsersService,
    private formBuilder: FormBuilder,
    private apiOrderService: ApiOrderService,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.apiUsersService.getUser(this.userId).subscribe((user: User) => {
      this.userForm = this.createUserForm(user);
    });
    // this.apiOrderService.getOrders().subscribe();
    this.userOrders$ = this.apiOrderService.getOrdersForUser(this.userId);
  }

  createUserForm(user: User) {
    return this.formBuilder.group({
      id: user.id,
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      address: [user.address, [Validators.required]],
      phoneNumber: [user.phoneNumber, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
    });
  }

  updateUserData() {
    if (this.userForm.valid) {
      this.loading = true;
      this.apiUsersService.updateUser(this.userForm.value).subscribe(()=> {
        this.loading = false;
        this.snackBar.open('User updated', 'Close', {
          duration: 3000
        });
      });
    }
  }
}
