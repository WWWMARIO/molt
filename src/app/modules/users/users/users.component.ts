import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { ApiUsersService } from '../api-users.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'address',
    'phoneNumber',
    'createdAt'
  ];


  users: Observable<User[]>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]);


  constructor(
    private apiUsersService: ApiUsersService,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.apiUsersService.getUsers().subscribe();
    this.users = this.usersService.getUsers();
    this.users.subscribe((response: User[]) => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
    });
  }

}
