import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent implements OnInit {
  auth = inject(AuthService);
  activeRoute = inject(ActivatedRoute);
  isLoading = inject(LoadingService).isLoading;

  token = this.activeRoute.snapshot.paramMap.get('token');
  resetForm: FormGroup;

  constructor() {
    this.resetForm = new FormBuilder().group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  resetPassword() {
    if (this.resetForm.valid) {
      this.auth
        .resetPassword({
          token: this.token,
          password: this.resetForm.get('password')?.value,
        })
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
