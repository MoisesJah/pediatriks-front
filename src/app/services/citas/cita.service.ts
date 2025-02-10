import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventApi } from '@fullcalendar/core';
import { Cita } from 'src/app/models/cita';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, of, map } from 'rxjs';

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

  getByPersonal(body: any) {
    return this.http.post<{ data: any }>(`${this.apiUrl}/citas/personal`, body);
  }

  getPacienteInfo(id: string) {
    return this.http.get<{ data: any }>(`${this.apiUrl}/citas/paciente/${id}`);
  }

  getCitasByPersonal(body: { id_personal: string; startWeek: string; endWeek: string }) {
    return this.http.post<{ data: any }>(`${this.apiUrl}/citas/personal`, body);
  }


  getCitasByFecha(id_personal: string, fecha_inicio: string, fecha_fin: string): Observable<any> {
    const body = {
      id_personal,
      fecha_inicio,
      fecha_fin
    };

    return this.http.post<{ data: any }>(`${this.apiUrl}/citas/filtrar-por-fechas`, body);
  }


  getAvailablePersonal(body: any) {
    return this.http.post<{ data: any }>(
      `${this.apiUrl}/citas/personal/available`,
      body
    );
  }

  update(id_cita: string, cita: any) {
    return this.http.put(`${this.apiUrl}/citas/edit/${id_cita}`, cita);
  }

  updateStatus(body: any) {
    return this.http.put(`${this.apiUrl}/citas/update-status`, body);
  }

  delete(body: any) {
    // return this.http.delete(`${this.apiUrl}/citas/delete`, body);
    return this.http.delete(`${this.apiUrl}/citas/delete`, {
      body
    });
  }
}
