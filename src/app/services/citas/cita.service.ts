import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventApi } from '@fullcalendar/core';
import { Cita } from 'src/app/models/cita';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(body: any) {
    return this.http.post<{ data: EventApi[] }>(
      `${this.apiUrl}/citas/list`,
      body
    );
  }

  getByTerapia(body: any) {
    return this.http.post<{ data: EventApi[] }>(
      `${this.apiUrl}/citas/list`,
      body
    );
  }

  getById(id_cita: string, id_sesion: string) {
    return this.http.get<{ data: Cita }>(
      `${this.apiUrl}/citas/sesion/${id_cita}/${id_sesion}`
    );
  }

  getCitasByUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/citas/user/${id}`);
  }

  create(cita: any) {
    return this.http.post<{ data: Cita }>(`${this.apiUrl}/citas/add`, cita);
  }

  createForTherapy(cita: any) {
    return this.http.post<{ data: Cita }>(
      `${this.apiUrl}/citas/add/therapy`,
      cita
    );
  }

  getPersonal(body: any) {
    return this.http.post<{ data: any }>(`${this.apiUrl}/citas/terapist`, body);
  }

  update(id_cita: string, cita: any) {
    return this.http.put(`${this.apiUrl}/citas/edit/${id_cita}`, cita);
  }
}
