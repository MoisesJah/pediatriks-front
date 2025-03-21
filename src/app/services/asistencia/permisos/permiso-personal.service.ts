import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisoPersonalService {
  private apiUrl = `${environment.apiUrl}/personal-permiso`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.apiUrl}/list`);
  }

  getById(id: string) {
    return this.http.get(`${this.apiUrl}/list/${id}`);
  }

  create(permiso: any) {
    return this.http.post(`${this.apiUrl}/create`, permiso);
  }

  update(id: string, permiso: any) {    
    return this.http.post(`${this.apiUrl}/edit/${id}`, permiso);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
