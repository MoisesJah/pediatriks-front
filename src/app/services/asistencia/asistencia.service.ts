import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  apiUrl = environment.apiUrl;
  status_url = `${this.apiUrl}/asistencia-status`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.apiUrl}/asistencia/list`);
  }

  getById(id: string) {
    return this.http.get(`${this.apiUrl}/asistencia/list/${id}`);
  }

  getByPersonal(id: string) {
    return this.http.get(`${this.apiUrl}/asistencia/personal/${id}`);
  }

  create(data: any) {
    return this.http.post(`${this.apiUrl}/asistencia/add`, data);
  }

  update(data: any, id: string) {
    return this.http.put(`${this.apiUrl}/asistencia/update/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/asistencia/delete/${id}`);
  }

  getStatusList() {
    return this.http.get(`${this.status_url}`);
  }
}
