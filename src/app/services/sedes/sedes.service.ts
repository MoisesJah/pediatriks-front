import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sede } from 'src/app/models/sede';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SedesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ data: Sede[] }>(`${this.apiUrl}/sede/list`);
  }

  getById(id: string) {
    return this.http.get<{ data: Sede }>(`${this.apiUrl}/sede/list/${id}`);
  }

  create(sede: Sede) {
    return this.http.post<Sede>(`${this.apiUrl}/sede/add`, sede);
  }

  update(sede: Sede, id: string) {
    return this.http.put<Sede>(`${this.apiUrl}/sede/edit/${id}`, sede);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/sede/delete/${id}`);
  }
}
