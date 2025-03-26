import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@UntilDestroy()
@Component({
  selector: 'app-delete-asistencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-asistencia.component.html',
})
export class DeleteAsistenciaComponent {
  modal = inject(NgbActiveModal)
  asistenciaService = inject(AsistenciaService);
  isLoading = inject(LoadingService).isLoading
  @Output() onSaveComplete = new EventEmitter()

  id_asistencia: string | undefined

  close() {
    this.modal.dismiss()
  }

  delete() {
    this.asistenciaService.delete(this.id_asistencia!).pipe(untilDestroyed(this)).subscribe(() => {
      this.onSaveComplete.emit()
      this.modal.close()
    })
  }
}
