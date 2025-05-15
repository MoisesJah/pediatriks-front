import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IRegister } from '../pages/registrate/register';
import { ILogin } from '../pages/login/login.interface';
import { IUser } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register({ name, email, dni, password }: IRegister): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/register`, { name, email, dni, password })
      .pipe(
        catchError((error) => {
          console.error('Error en el registro', error);
          return throwError(error);
        })
      );
  }

  login({ email, password }: ILogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // Almacenar token y usuario en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }),
      catchError((error) => {
        console.error('Error en el login', error);
        return throwError(error);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        // Limpiar token y usuario al cerrar sesión
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }),
      catchError((error) => {
        console.error('Error en el logout', error);
        return throwError(error);
      })
    );
  }

  sentResetLink(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-link`, { email });
  }

  resetPassword(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, body);
  }

  user(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.user();
    return user ? user.tipo_user === 'administrador' : false;
  }

  isPaciente(): boolean {
    const user = this.user();
    return user ? user.tipo_user === 'paciente' : false;
  }

  isTerapista(): boolean {
    const user = this.user();
    return user ? user.tipo_user === 'terapista' : false;
  }

  isSecretaria(): boolean {
    const user = this.user();
    return user ? user.tipo_user === 'secretaria' : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
