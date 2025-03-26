import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@UntilDestroy()
@Component({
  selector: 'app-check-asistencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-asistencia.component.html',
  styleUrl: './check-asistencia.component.scss',
})
export class CheckAsistenciaComponent {
  showBanner = false;
  modal = inject(NgbModal);
  asistenciaService = inject(AsistenciaService);
  tosat = inject(ToastrService);
  auth = inject(AuthService).user()?.personal;
  isLoading = inject(LoadingService).isLoading;
  @Output() onRequestComplete = new EventEmitter<void>();

  todayHorario = '';
  currentDate = new Date();

  close() {
    this.modal.dismissAll();
  }

  confirmAsistencia() {
    this.asistenciaService
      .create({
        id_personal: this.auth?.id_personal!,
        fecha: this.currentDate,
        hora_asistencia: this.currentDate.toTimeString().slice(0, 8),
        id_status: this.showBanner ? 2 : 1,
      })
      .subscribe({
        next: () => {
          this.onRequestComplete.emit();
          this.close();
        },
        error: (err) => {
          if (err.error.errors) {
            const errors = Object.values(err.error.errors).join('\n');
            this.tosat.error(errors, 'Error');
          }else{
            this.tosat.error('Ocurrio un error al crear la asistencia', 'Error');
          }
        },
      });
  }
}
