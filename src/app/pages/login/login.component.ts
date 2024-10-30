import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  isLoading = inject(LoadingService).isLoading;
  router = inject(Router);

  errors: Record<string,string> = {"error":""};

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  storeCredentials(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  redirectToDashboard(value: any) {
    this.storeCredentials(value.token, value.user);

    switch (value.user.tipo_user) {
      case 'administrador':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'paciente':
        this.router.navigate(['/dashboard']);
        break;
      case 'terapista':
        this.router.navigate(['/terapista/dashboard']);
        break;
      default:
        break;
    }
  }

  handleSubmit() {
    this.errors = {};
    this.authService
      .login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
      .subscribe({
        next: (value: any) => {
          this.redirectToDashboard(value);
        },
        error: (err) => {
          // console.error(err);
          this.errors = err.error;
        },
      });
  }
}
