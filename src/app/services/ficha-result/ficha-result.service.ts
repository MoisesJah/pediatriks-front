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

  create(body: any) {
    return this.http.post(`${this.apiUrl}/add`, body);
  }

  getOne(id:string){
    return this.http.get(`${this.apiUrl}/list/${id}`)
  }
}
