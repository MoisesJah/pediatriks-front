import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrar-modal',
  templateUrl: './borrar-modal.component.html',
  styleUrls: ['./borrar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class BorrarModalComponent {
  modal = inject(NgbModal);
  paqueteService = inject(PaqueteService);
  isLoading = inject(LoadingService).isLoading;

  @Input() paqueteId: string | { id_paquetes: string } = '';
  @Output() onSaveComplete = new EventEmitter<void>();

  close() {
    this.modal.dismissAll();
  }

  delete() {
    const id = typeof this.paqueteId === 'string' ? this.paqueteId : this.paqueteId.id_paquetes;
    if (id) {
      this.paqueteService.delete(id).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        },
        error: (err) => {
          console.error('Error al eliminar paquete:', err);
        }
      });
    } else {
      console.error('ID del paquete no proporcionado o en formato incorrecto');
    }
  }
}
