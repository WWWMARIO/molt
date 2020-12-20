import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: Observable<User>
  userForm: FormGroup
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private apiUsersService: ApiUsersService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.apiUsersService.getUser(this.userId).subscribe((user: User)=>{
      console.log(user)
      this.userForm = this.formBuilder.group({
        firstName: [user.firstName, [Validators.required]],
        lastName: [user.lastName, [Validators.required]],
        address: [user.address, [Validators.required]],
        phoneNumber: [user.phoneNumber, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]]
      });
    })



  }

}
