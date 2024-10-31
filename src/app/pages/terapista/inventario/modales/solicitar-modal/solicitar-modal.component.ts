import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-solicitar-modal',
  templateUrl: './solicitar-modal.component.html',
  styleUrls: ['./solicitar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class SolicitarModalComponent {
  modal = inject(NgbModal);
  loadingService = inject(LoadingService);
  isLoading = this.loadingService.isLoading;

  solicitarForm: FormGroup;

  @Output() onRequestComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.solicitarForm = this.fb.group({
      cantidad_solicitar: ['', [Validators.required, Validators.min(1)]],
    });
  }

  close() {
    this.modal.dismissAll();
  }

  sendRequest() {
    if (this.solicitarForm.invalid) {
      console.error('El formulario no es válido.');
      return;
    }

    const formData = {
      cantidad_solicitar: this.solicitarForm.get('cantidad_solicitar')?.value,
    };

    // Lógica para manejar la solicitud (enviar a un servicio o procesar el formulario)
    console.log('Solicitud enviada exitosamente:', formData);
    this.close();
    this.onRequestComplete.emit();
  }
}
