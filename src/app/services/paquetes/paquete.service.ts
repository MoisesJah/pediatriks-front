import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paquete } from 'src/app/models/paquetes';

@Injectable({
  providedIn: 'root',
})
export class PaqueteService {
  private apiUrl = `${environment.apiUrl}/paquete`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Paquete[] }> {
    return this.http.get<{ data: Paquete[] }>(`${this.apiUrl}/list`); // Ruta para obtener todos los paquetes
  }

  getById(id: string): Observable<{ data: Paquete }> {
    return this.http.get<{ data: Paquete }>(`${this.apiUrl}/show/${id}`);
  }

  create(paquete: Paquete): Observable<Paquete> {
    return this.http.post<Paquete>(`${this.apiUrl}/add`, paquete);
  }

  update(id: string, paquete: Paquete): Observable<Paquete> {
    return this.http.put<Paquete>(`${this.apiUrl}/edit/${id}`, paquete); // Ruta para actualizar un paquete
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`); // Ruta para eliminar un paquete
  }
}
