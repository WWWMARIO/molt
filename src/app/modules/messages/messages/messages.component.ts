import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ApiMessagesService } from '../api-messages.service';
import { Message } from 'src/app/modules/shared/models/Message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'email',
    'message',
    'delete',
    'respond'
  ];


  messages: Observable<Message[]>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]);


  constructor(
    private apiMessagesService: ApiMessagesService
    ) { }

  ngOnInit(): void {
    this.apiMessagesService.refreshMessages().subscribe((reso)=> {
      console.log(reso)
    });
    this.messages = this.apiMessagesService.getMessages();
    this.messages.subscribe((response: Message[]) => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
    });
  }

  deleteMessage(message: Message) {
    this.apiMessagesService.deleteMessage(message.id).subscribe(()=> {
      this.apiMessagesService.refreshMessages().subscribe()
    })
  }

}
