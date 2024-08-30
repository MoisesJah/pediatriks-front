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

  create(personal: Personal) {
    const data = new FormData();
      data.append('nombre', personal.nombre);
      data.append('dni', personal.dni);
      data.append('telefono', personal.telefono);
      data.append('correo', personal.correo);
      data.append('id_genero', personal.id_genero);
      data.append('id_sede', personal.id_sede);
      data.append('sueldo', personal.sueldo.toString());
      data.append('id_tipopersonal', personal.id_tipopersonal);
      data.append('id_terapia', personal.id_terapia);
      data.append('id_horariop', personal.id_horariop);
      data.append('cv', personal.cv ? personal.cv : 'null');

    return this.http.post<Personal>(`${this.apiUrl}/personal/add`, data);
  }

  update(personal: Personal, id: string) {
    return this.http.put<Personal>(
      `${this.apiUrl}/personal/edit/${id}`,
      personal
    );
  }

  getCV(id: string) {
    return this.http.get(`${this.apiUrl}/personal/cv/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/personal/delete/${id}`);
  }
}
