import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.scss',
})
export class RegistrateComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    dni: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  handleSubmit() {
    this.authService
      .register({
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        dni: this.registerForm.value.dni!,
        password: this.registerForm.value.password!,
      })
      .subscribe({
        next:(value)=> {
          console.log(value);
          this.router.navigate(['/login']);
        },
        error(err) {
          console.error(err);
        },
      });
    console.log(this.registerForm.value);
  }
}
