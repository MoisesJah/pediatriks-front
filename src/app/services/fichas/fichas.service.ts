import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FichasService {
  private apiUrl = `${environment.apiUrl}/ficha`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/list`);
  }

  getById(id: string) {
    return this.http.get<{ data: any }>(`${this.apiUrl}/list/${id}`);
  }

  create(ficha: any) {
    return this.http.post(`${this.apiUrl}/add`, ficha);
  }

  update(ficha: any, id: string) {
    return this.http.put(`${this.apiUrl}/edit/${id}`, ficha);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
