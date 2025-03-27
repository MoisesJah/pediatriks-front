import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FichaResultService {
  private apiUrl = `${environment.apiUrl}/ficha-result`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.apiUrl}/list`);
  }

  getList() {
    return this.http.get<{ data: any }>(`${this.apiUrl}/all`);
  }

  getByPacientes(id: number) {
    return this.http.get<{ data: any }>(`${this.apiUrl}/user/${id}`);
  }

  create(body: any) {
    return this.http.post(`${this.apiUrl}/add`, body);
  }

  getOne(id: string) {
    return this.http.get<{ data: any }>(`${this.apiUrl}/list/${id}`);
  }

  exists(id: string, id_sesion: string) {
    return this.http.get<{ data: any }>(`${this.apiUrl}/exists/${id}/${id_sesion}`);
  }

  update(id: string, body: any) {
    return this.http.put(`${this.apiUrl}/edit/${id}`, body);
  }
}
