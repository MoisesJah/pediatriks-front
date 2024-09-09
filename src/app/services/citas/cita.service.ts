import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventApi } from '@fullcalendar/core';
import { Cita } from 'src/app/models/cita';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(month?: number, year?: number) {
    if (month && year) {
      return this.http.get<{ data: EventApi[] }>(
        `${this.apiUrl}/cita-test/list/${month}/${year}`
      )
    }
    return this.http.get<{ data: EventApi[] }>(`${this.apiUrl}/cita-test/list`);
  }

  getByTerapia(id: string, month: number, year: number) {
      return this.http.get<{ data: EventApi[] }>(
        `${this.apiUrl}/cita-test/list/${month}/${year}/${id}`
      );
  }

  getById(id: string) {
    return this.http.get<{ data: Cita }>(`${this.apiUrl}/cita-test/list/${id}`);
  }

  create(cita: any) {
    return this.http.post<{ data: Cita }>(`${this.apiUrl}/cita-test/add`, cita);
  }
}