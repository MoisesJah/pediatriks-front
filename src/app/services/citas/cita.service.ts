import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita } from 'src/app/models/cita';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ data: Cita[] }>(`${this.apiUrl}/cita-test/list`);
  }

  getById(id: string) {
    return this.http.get<{ data: Cita }>(`${this.apiUrl}/cita-test/list/${id}`);
  }

  create(cita: any) {
    return this.http.post<{ data: Cita }>(
      `${this.apiUrl}/cita-test/add`,
      cita
    );
  }
}
