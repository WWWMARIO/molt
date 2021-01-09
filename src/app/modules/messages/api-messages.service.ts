import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/modules/shared/models/Message.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiMessagesService {

  messages$ = new BehaviorSubject<Message[]>([]);


  constructor(private http: HttpClient) { }

  getMessages(){
    return this.messages$.asObservable();
  }


  refreshMessages() {
    return this.http.get<Message[]>(`${API_BASE_URL}/contact`).pipe(
      tap((messages) => {
        this.messages$.next(messages);
      })
    );
  }

  deleteMessage(messageId: number) {
    return this.http.delete(`${API_BASE_URL}/contact/${messageId}`);
  }
}
