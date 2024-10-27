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
    return this.http.get<{ data: Paquete[] }>(`${this.apiUrl}/list`);
  }

  getById(id: string): Observable<{ data: Paquete }> {
    return this.http.get<{ data: Paquete }>(`${this.apiUrl}/show/${id}`);
  }

  create(paquete: any) {
    return this.http.post(`${this.apiUrl}/add`, paquete);
  }

  update(id: string, paquete: any) {
    return this.http.post(`${this.apiUrl}/edit/${id}`, paquete);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  purchase(paqueteId:string,pacienteId: string, usuarioId: number): Observable<any> {
    const body = {
        paqueteId,
        pacienteId,
        usuarioId
    };
    return this.http.post(`${this.apiUrl}/purchase`, body);
}

}
