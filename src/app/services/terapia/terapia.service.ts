import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Terapia } from 'src/app/models/terapia'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class TerapiaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(month?: number, year?: number): Observable<{ data: Terapia[] }> {
    if (month && year) {
      return this.http.get<{ data: Terapia[] }>(`${this.apiUrl}/terapia/list/${month}/${year}`);
    }
    return this.http.get<{ data: Terapia[] }>(`${this.apiUrl}/terapia/list`);
  }

  getById(id: string): Observable<{ data: Terapia }> {
    return this.http.get<{ data: Terapia }>(`${this.apiUrl}/terapia/list/${id}`);
  }

  create(terapia: Terapia): Observable<Terapia> {
    return this.http.post<Terapia>(`${this.apiUrl}/terapia/add`, terapia);
  }

  update(terapia: Terapia, id: string): Observable<Terapia> {
    return this.http.put<Terapia>(`${this.apiUrl}/terapia/edit/${id}`, terapia);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/terapia/delete/${id}`);
  }

  // Nuevos métodos
  getPersonalByTerapia(body:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/terapia/getpersonal/terapia`, body);
  }

  getPaquetesByTerapia(id: string) {
    return this.http.get<any>(`${this.apiUrl}/terapia/getpaquetes/${id}`);
  }

  getByPaquete(id:string){
    return this.http.get(`${this.apiUrl}/terapia/paquetes/${id}`);
  }

  getAllPersonal(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/terapia/getpersonal`);
  }

  getCitasByTerapia(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/terapia/getcitas/terapia/${id}`);
  }

  getAllCitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/terapia/getcitas`);
  }

  getAllPacientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/terapia/getpacientes`);
  }

  getHorariosByTerapia(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/terapia/gethorarios/terapia/${id}`);
  }

  getAllHorarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/terapia/gethorarios`);
  }

  getPacientesByTerapia(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/terapia/pacientes/${id}`);
  }
}
