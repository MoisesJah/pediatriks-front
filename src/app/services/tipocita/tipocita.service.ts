import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoCita } from 'src/app/models/tipocita';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipocitaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ data: TipoCita[] }>(`${this.apiUrl}/tipocita/list`);
  }
}
