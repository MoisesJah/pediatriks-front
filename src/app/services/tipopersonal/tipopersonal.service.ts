import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TipoPersonal } from 'src/app/models/tipopersonal';  // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class TipoPersonalService {
  apiUrl = `${environment.apiUrl}/tipopersonal`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<{ data: TipoPersonal[]}> {
    return this.http.get<{ data: TipoPersonal[] }>(`${this.apiUrl}/list`);
  }

  getById(id: string): Observable<TipoPersonal> {
    return this.http.get<TipoPersonal>(`${this.apiUrl}/list/${id}`);
  }

  create(tipopersonal: TipoPersonal): Observable<TipoPersonal> {
    return this.http.post<TipoPersonal>(`${this.apiUrl}/add`, tipopersonal);
  }

  update(id: string, tipopersonal: TipoPersonal): Observable<TipoPersonal> {
    return this.http.put<TipoPersonal>(`${this.apiUrl}/edit/${id}`, tipopersonal);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
