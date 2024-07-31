import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IRegister } from '../pages/registrate/register';
import { ILogin } from '../pages/login/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register({ name, email, dni, password }: IRegister) {
    return this.http.post(`${this.apiUrl}/register`, {
      name,
      email,
      dni,
      password,
    });
  }

  login({ email, password }: ILogin) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
