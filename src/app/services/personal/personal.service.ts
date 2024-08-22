import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personal } from 'src/app/models/personal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ data: Personal[] }>(`${this.apiUrl}/personal/list`);
  }

  getById(id: string) {
    return this.http.get<{ data: Personal }>(
      `${this.apiUrl}/personal/list/${id}`
    );
  }

  create(personal: Personal) {
    return this.http.post<Personal>(`${this.apiUrl}/personal/add`, personal);
  }

  update(personal: Personal, id: string) {
    return this.http.put<Personal>(
      `${this.apiUrl}/personal/edit/${id}`,
      personal
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/personal/delete/${id}`);
  }
}
