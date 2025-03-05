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
  imports: [ReactiveFormsModule, CommonModule],
})
export class BorrarModalComponent {
  modal = inject(NgbModal);
  sedeService = inject(SedesService);
  isLoading = inject(LoadingService).isLoading;

  @Input() sedeId: string | undefined;
  @Output() onSaveComplete = new EventEmitter<void>();

  close() {
    this.modal.dismissAll();
  }

  delete() {
    this.sedeService.delete(this.sedeId!).subscribe({
      next: () => {
        this.onSaveComplete.emit();
        this.modal.dismissAll();
      },
      error: (err) => {
        console.error('Error al eliminar sede:', err);
      },
    });
  }
}
