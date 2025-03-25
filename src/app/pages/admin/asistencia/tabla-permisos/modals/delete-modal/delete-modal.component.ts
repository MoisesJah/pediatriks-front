import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisoPersonalService } from 'src/app/services/asistencia/permisos/permiso-personal.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
})
export class DeleteModalComponent {
  modal = inject(NgbActiveModal);
  permisoPersonalService = inject(PermisoPersonalService);
  isLoading = inject(LoadingService).isLoading;
  @Output() onSaveComplete = new EventEmitter();

  permisoId: string | undefined;

  close() {
    this.modal.dismiss();
  }

  delete() {
    this.permisoPersonalService.delete(this.permisoId!).subscribe({
      next: () => {
        this.onSaveComplete.emit();
        this.modal.close();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
