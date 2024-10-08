import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-borrar-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './borrar-modal.component.html',
  styleUrl: './borrar-modal.component.scss',
})
export class BorrarModalComponent {
  event: Cita | null = null;
  activeModal = inject(NgbActiveModal);
  citasService = inject(CitaService);
  isLoading = false;
  modal = inject(NgbModal);

  @Output() eventDeleted = new EventEmitter();
  deleteForm: FormGroup;

  closeModal() {
    this.activeModal.close();
  }

  constructor(private fb: FormBuilder) {
    this.deleteForm = this.fb.group({
      deleteOption: ['1'],
    });
  }

  deleteEvent() {
    if (this.event) {
      this.isLoading = true;
      this.citasService
        .delete({
          id_sesion: this.event.sesion.id_sesion!,
          ...this.deleteForm.value,
        })
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this.eventDeleted.emit();
        });
    }
  }}