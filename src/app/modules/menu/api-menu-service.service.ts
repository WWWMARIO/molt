import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from 'src/environments/environment';
import { IItem } from 'src/app/shared/models/IItem.model';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuServiceService {

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get<IItem[]>(`${API_BASE_URL}/items`);
  }
}
