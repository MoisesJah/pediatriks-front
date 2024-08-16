

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HorarioPersonal } from 'src/app/models/horariop';  // Asegúrate de ajustar la ruta al archivo del modelo

@Injectable({
  providedIn: 'root'
})
export class HorarioPersonalService {
  private apiUrl = `${environment.apiUrl}/horariopersonal`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<{ data: HorarioPersonal[]}> {
    return this.http.get<{ data: HorarioPersonal[] }>(`${this.apiUrl}/list`);
  }

  getById(id: string): Observable<HorarioPersonal> {
    return this.http.get<HorarioPersonal>(`${this.apiUrl}/list/${id}`);
  }

  create(horario: HorarioPersonal): Observable<HorarioPersonal> {
    return this.http.post<HorarioPersonal>(`${this.apiUrl}/add`, horario);
  }

  update(id: string, horario: HorarioPersonal): Observable<HorarioPersonal> {
    return this.http.put<HorarioPersonal>(`${this.apiUrl}/edit/${id}`, horario);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
