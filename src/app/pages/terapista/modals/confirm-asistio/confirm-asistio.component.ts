import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';

@UntilDestroy()
@Component({
  selector: 'app-confirm-asistio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './confirm-asistio.component.html',
  styleUrl: './confirm-asistio.component.scss',
})
export class ConfirmAsistioComponent implements OnInit {
  modal = inject(NgbModal);
  citaService = inject(CitaService);
  isLoading = inject(LoadingService).isLoading;
  toastService = inject(ToastrService);
  @Output() citaUpdated = new EventEmitter();

  id_sesion: string = '';

  confirmForm: FormGroup;

  ngOnInit(): void {
    //
  }

  constructor(private fb: FormBuilder) {
    this.confirmForm = this.fb.group({
      id_status: [null, Validators.required],
    });
  }

  confirm() {
    this.citaService
      .updateStatus({
        id_sesion: this.id_sesion,
        id_status: this.confirmForm.value.id_status,
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.citaUpdated.emit();
          this.close();
        },
        error: (err) => {
          if (err.error.errors) {
            const errors = Object.values(err.error.errors).join('');
            this.toastService.error(errors, 'Error');
          }
        },
      });
  }

  close() {
    this.modal.dismissAll();
  }
}
