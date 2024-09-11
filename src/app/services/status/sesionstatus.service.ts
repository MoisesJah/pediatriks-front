import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionstatusService {
  private apiUrl= environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/sesion-status/list`);
  }
}
