import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  auth = inject(AuthService)
  modal = inject(NgbModal)
  toast = inject(ToastrService)
  isLoading = inject(LoadingService).isLoading

  error : Record<string, string> = {'message': ''}

  form: FormGroup

  constructor() {
    this.form = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
      
  }

  close() {
    this.modal.dismissAll();
  }

  resetlink() {
    if(!this.form.valid) return

    this.error = {}

    this.auth.sentResetLink(this.form.get('email')?.value).subscribe({
      next: (data) => {
        this.toast.success(data.message, 'Exito');
        this.modal.dismissAll();
      },
      error: (err) => {
        this.error = err.error
      }
    })
  }
}
