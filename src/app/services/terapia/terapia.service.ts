import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TerapiaService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  // add empty list for tables
  getAll() {
    return this.http.get(`${this.apiUrl}/terapia/list`);
  }

  getById(id: string) {
    return this.http.get(`${this.apiUrl}/terapia/list/${id}`);
  }

  create(terapia: any) {
    return this.http.post(`${this.apiUrl}/terapia/add`, terapia);
  }

  update(terapia: any, id: string) {
    return this.http.put(`${this.apiUrl}/terapia/edit/${id}`, terapia);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/terapia/delete/${id}`);
  }
}
