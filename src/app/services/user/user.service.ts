import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ data: IUser[] }>(`${this.apiUrl}/usuario/list`);
  }

  getById(id: number) {
    return this.http.get<IUser>(`${this.apiUrl}/usuario/list/${id}`);
  }

  create(user: IUser) {
    return this.http.post<IUser>(`${this.apiUrl}/usuario/add`, user);
  }

  update(user: IUser, id: number) {
    return this.http.put<IUser>(`${this.apiUrl}/usuario/edit/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete<IUser>(`${this.apiUrl}/usuario/delete/${id}`);
  }
}
