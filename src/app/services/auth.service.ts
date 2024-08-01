import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IRegister } from '../pages/registrate/register';
import { ILogin } from '../pages/login/login.interface';
import { IUser } from '../models/user';

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

  user(): IUser {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  isAdmin() {
    const user = this.user();
    return user && user.tipo_user === 'administrador';
  }
}
