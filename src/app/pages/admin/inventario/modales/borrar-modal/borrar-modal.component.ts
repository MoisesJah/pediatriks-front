import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrar-modal', // Cambiado el selector
  templateUrl: './borrar-modal.component.html',
  styleUrls: ['./borrar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class BorrarModalComponent {
  modal = inject(NgbModal);
  inventarioService = inject(InventarioService);
  isLoading = inject(LoadingService).isLoading;

  @Input() inventarioId: string | { id: string } = '';
  @Output() onSaveComplete = new EventEmitter<void>();

  close() {
    this.modal.dismissAll();
  }

  delete() {
    const id = typeof this.inventarioId === 'string' ? this.inventarioId : this.inventarioId.id;
    if (id) {
      this.inventarioService.delete(id).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        },
        error: (err) => {
          console.error('Error al eliminar inventario:', err); 
        }
      });
    } else {
      console.error('ID del inventario no proporcionado o en formato incorrecto');
    }
  }
}
