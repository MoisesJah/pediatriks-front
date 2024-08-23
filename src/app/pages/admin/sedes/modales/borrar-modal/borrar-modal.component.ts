import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-borrar-modal',
  templateUrl: './borrar-modal.component.html',
  styleUrls: ['./borrar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class BorrarModalComponent {
  modal = inject(NgbModal);
  sedeService = inject(SedesService);
  isLoading = inject(LoadingService).isLoading;

  @Input() sedeId: string | { id_sedes: string } = '';
  @Output() onSaveComplete = new EventEmitter<void>();

  close() {
    this.modal.dismissAll();
  }

  delete() {
    // Convertir el ID a número
    const id = typeof this.sedeId === 'string' ? parseInt(this.sedeId, 10) : parseInt(this.sedeId.id_sedes, 10);
    if (!isNaN(id)) {
      this.sedeService.delete(id as  unknown as string).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        },
        error: (err) => {
          console.error('Error al eliminar sede:', err);
        }
      });
    } else {
      console.error('ID de la sede no proporcionado o en formato incorrecto');
    }
  }
}
