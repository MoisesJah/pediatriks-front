import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventario } from 'src/app/models/inventario';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private apiUrl = `${environment.apiUrl}/inventario`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ data: Inventario[] }> {
    return this.http.get<{ data: Inventario[] }>(`${this.apiUrl}/list`);
  }

  getById(id: string): Observable<{ data: Inventario }> {
    return this.http.get<{ data: Inventario }>(`${this.apiUrl}/show/${id}`);
  }

  create(inventario: any) {
    return this.http.post(`${this.apiUrl}/add`, inventario);
  }

  update(id: string, inventario: any) {
    return this.http.put(`${this.apiUrl}/edit/${id}`, inventario);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  addStock(formData: any) {
    return this.http.post(`${this.apiUrl}/add-stock`, formData);
}


  // Método para que el terapeuta pueda solicitar items del inventario
  requestItem(itemId: string, terapeutaId: string): Observable<any> {
    const body = { itemId, terapeutaId };
    return this.http.post(`${this.apiUrl}/request-item`, body);
  }
}
