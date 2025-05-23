import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personal } from 'src/app/models/personal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ data: Personal[] }>(`${this.apiUrl}/personal/list`);
  }

  getById(id: string) {
    return this.http.get<{ data: Personal }>(
      `${this.apiUrl}/personal/list/${id}`
    );
  }

  getAtenciones(body: any) {
    return this.http.post<{ data: any }>(
      `${this.apiUrl}/personal/stats?type=atenciones`,
      body
    );
  }

  getHorariosLibre(body:any){
    return this.http.post<{ data: any }>(
      `${this.apiUrl}/personal/disponible`,
      body
    )
  }

  getAsistencias(body: any) {
    return this.http.post<{ data: any }>(
      `${this.apiUrl}/personal/stats?type=asistencias`,
      body
    );
  }

  getStatMensual(body: any) {
    return this.http.post<{ data: any }>(
      `${this.apiUrl}/personal/stats?type=mensual`,
      body
    );
  }

  getPersonalByUser(id: number) {
    return this.http.get<{ data: Personal }>(
      `${this.apiUrl}/personal/user/${id}`
    );
  }

  getHorarios(id: string) {
    return this.http.get<{ data: any }>(
      `${this.apiUrl}/personal/horarios/${id}`
    );
  }

  getHorario(id: string) {
    return this.http.get<{ data: any }>(
      `${this.apiUrl}/personal/horario/${id}`
    );
  }

  getByTerapia(id: string) {
    return this.http.get<{ data: Personal[] }>(
      `${this.apiUrl}/personal/terapias/${id}`
    );
  }

  create(personal: any) {
    const data = new FormData();
    data.append('nombre', personal.nombre);
    data.append('dni', personal.dni);
    data.append('telefono', personal.telefono);
    data.append('correo', personal.correo);
    data.append('id_genero', personal.id_genero);
    data.append('id_sede', personal.id_sede);
    data.append('sueldo', personal.sueldo.toString());
    data.append('id_terapia', personal.id_terapia);
    data.append('nro_colegiatura', personal.nro_colegiatura);
    data.append('direccion', personal.direccion);
    data.append('horarios', JSON.stringify(personal.horarios));
    data.append('color', personal.color);

    if (personal.cv) {
      data.append('cv', personal.cv);
    }

    return this.http.post<Personal>(`${this.apiUrl}/personal/add`, data);
  }

  update(personal: any, id: string) {
    return this.http.post<any>(`${this.apiUrl}/personal/edit/${id}`, personal);
  }

  getCV(id: string) {
    return this.http.get(`${this.apiUrl}/personal/cv/${id}`, {
      responseType: 'blob',
    });
  }

  getAvailable() {
    return this.http.get<{ data: Personal[] }>(
      `${this.apiUrl}/personal/available`
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/personal/delete/${id}`);
  }
}
