import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  apiUrl = `${environment.apiUrl}/paciente/stats`;

  constructor(private http: HttpClient) {}

  getTerapias(id: string) {
    return this.http.post(`${this.apiUrl}?type=terapias`, { pacienteId: id });
  }

  getSesiones(id: string) {
    return this.http.post(`${this.apiUrl}?type=horarios`, { pacienteId: id });
  }

  getAsistencias(id: string) {
    return this.http.post(`${this.apiUrl}?type=asistencias`, {
      pacienteId: id,
    });
  }

  getFichas(id: string) {
    return this.http.post(`${this.apiUrl}?type=informes`, { pacienteId: id });
  }

  getPaquetes(id: string) {
    return this.http.post(`${this.apiUrl}?type=paquetes`, { pacienteId: id });
  }
}
