import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudInventarioService {
  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) {}

  aceptarSolicitud(idSolicitud: string, idPersonalAprueba: string): Observable<any> {
    const data = { id_solicitud: idSolicitud, id_admin: idPersonalAprueba };
    return this.http.post<any>(`${this.apiUrl}/aceptar`, data);
  }

  enviarSolicitud(idPersonalSolicita: string, idItem: string, cantidad: number, idTerapia: string,stockActual: number): Observable<any> {
    const data = {
      id_personal_solicita: idPersonalSolicita,
      id_item: idItem,
      cantidad: cantidad,
      id_terapia: idTerapia,
      stock_terapista: stockActual
    };
    return this.http.post<any>(`${this.apiUrl}/enviar`, data);
  }

  negarSolicitud(idSolicitud: string, idPersonalAprueba: string): Observable<any> {
    const data = { id_solicitud: idSolicitud, id_admin: idPersonalAprueba };
    return this.http.post<any>(`${this.apiUrl}/negar`, data);
  }

  cargarSolicitudesPendientes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pendientes`);
  }

  cargarTodasLasSolicitudes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/todas`);
  }
}
