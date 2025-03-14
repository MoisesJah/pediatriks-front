import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { AuthService } from 'src/app/services/auth.service';

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
  auth = inject(AuthService).user()?.personal;
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
      })
      .subscribe({
        next: () => {
          this.onRequestComplete.emit();
          this.close();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
