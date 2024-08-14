import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-pacientes-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  modal = inject(NgbActiveModal)
  pacienteService = inject(PacienteService);
  isLoading = inject(LoadingService).isLoading
  @Output() onSaveComplete = new EventEmitter()

  pacienteId: string | undefined

  close() {
    this.modal.dismiss()
  }

  delete() {
    this.pacienteService.delete(this.pacienteId!).subscribe(() => {
      this.onSaveComplete.emit()
      this.modal.close()
    })
  }
}
