import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.scss',
})
export class RegistrateComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isLoading = false;
  errors = {};

  registerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    dni: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  handleSubmit() {
    this.isLoading = true;
    this.authService
      .register({
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        dni: this.registerForm.value.dni!,
        password: this.registerForm.value.password!,
      })
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe({
        next: (value) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errors = err.error.errors;
          this.isLoading = false;
          console.log(this.errors);
        },
      });
  }
}
