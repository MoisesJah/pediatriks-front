import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaciente } from 'src/app/models/paciente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.apiUrl}/paciente/all`);
  }

  getById(id: string) {
    return this.http.get(`${this.apiUrl}/paciente/list/${id}`);
  }

  create(paciente: IPaciente) {
    return this.http.post(`${this.apiUrl}/paciente/create`, paciente);
  }

  update(paciente: IPaciente, id: string) {
    return this.http.put(`${this.apiUrl}/paciente/edit/${id}`, paciente);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/paciente/delete/${id}`);
  }
}
