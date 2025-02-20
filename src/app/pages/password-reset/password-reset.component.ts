import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NgOptimizedImage],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent implements OnInit {
  auth = inject(AuthService);
  activeRoute = inject(ActivatedRoute);
  isLoading = inject(LoadingService).isLoading;
  toast = inject(ToastrService);
  router = inject(Router);

  token = this.activeRoute.snapshot.paramMap.get('token');
  email = this.activeRoute.snapshot.queryParamMap.get('email');
  resetForm: FormGroup;

  constructor() {
    this.resetForm = new FormBuilder().group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  resetPassword() {
    if (this.resetForm.valid) {
      this.auth
        .resetPassword({
          token: this.token,
          email: this.resetForm.get('email')?.value,
          new_password: this.resetForm.get('password')?.value,
        })
        .subscribe({
          next: (data) => {
            this.router.navigate(['/login']);
            this.toast.success('Ya puede iniciar sesión', 'Contraseña Restablecida', {closeButton: true});
          },
          error: (err) => {
            this.toast.error('Inténtelo de nuevo', 'Ocurrió un error');
          },
        });
    }
  }
}
