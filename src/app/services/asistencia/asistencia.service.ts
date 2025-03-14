import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.apiUrl}/asistencia/list`);
  }

  getByPersonal(id: string) {
    return this.http.get(`${this.apiUrl}/asistencia/personal/${id}`);
  }

  create(data: any) {
    return this.http.post(`${this.apiUrl}/asistencia/add`, data);
  }
}
