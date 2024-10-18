import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipouserService {
  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<{ data: any }>(`${this.apiUrl}/tipo-user/list`);
  }

  getPacientes() {
    return this.http.get<{ data: IUser[] }>(`${this.apiUrl}/usuario/list/paciente`);
  }

  getById(id: string) {
    return this.http.get<{ data: any }>(`${this.apiUrl}/tipo-user/list/${id}`);
  }

  create(tipouser: any) {
    return this.http.post<{ data: any }>(`${this.apiUrl}/tipo-user/add`, tipouser);
  }

  update(tipouser: any, id: string) {
    return this.http.put<{ data: any }>(`${this.apiUrl}/tipouser/edit/${id}`, tipouser);
  }

  delete(id: string) {
    return this.http.delete<{ data: any }>(`${this.apiUrl}/tipouser/delete/${id}`);
  }
}
