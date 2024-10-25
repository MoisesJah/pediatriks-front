import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private apiUrl = `${environment.apiUrl}/reportes`;

  constructor(private http: HttpClient) {}

  getReportes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  getReportesFiltrados(startDate: string, endDate: string, montoMin: number): Observable<any> {
    let params = new HttpParams();
    if (startDate && endDate) {
      params = params.set('start_date', startDate).set('end_date', endDate);
    }
    if (montoMin) {
      params = params.set('monto_min', montoMin.toString());
    }
    return this.http.get<any>(`${this.apiUrl}/filtrados`, { params });
  }
}
