import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { SolicitudInventarioService } from 'src/app/services/solicitud-inventario/solicitud-inventarioservice';
import { AuthService } from 'src/app/services/auth.service';

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
  authService = inject(AuthService);
  solicitudInventarioService = inject(SolicitudInventarioService);
  isLoading = this.loadingService.isLoading;
  user = this.authService.user(); // Acceder al usuario logueado

  solicitarForm: FormGroup;

  @Input() inventarioId!: number;  // Cambia esto de itemId a inventarioId
  @Output() onRequestComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.solicitarForm = this.fb.group({
      cantidad_solicitar: ['', [Validators.required, Validators.min(1)]],
      stock_actual: ['', [Validators.required, Validators.min(0)]],
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

    const cantidad = this.solicitarForm.get('cantidad_solicitar')?.value;
    const stockActual = this.solicitarForm.get('stock_actual')?.value;

    const idPersonalSolicita = this.user?.personal?.id_personal;
    const idTerapiaSolicita = this.user?.personal?.terapia?.id_terapia;

    if (this.inventarioId === undefined || !idPersonalSolicita || !idTerapiaSolicita) {
      console.error('Faltan datos necesarios para enviar la solicitud.');
      return;
    }

    this.loadingService.startLoading();

    // Enviar la solicitud incluyendo el stock_actual
    this.solicitudInventarioService
      .enviarSolicitud(idPersonalSolicita, this.inventarioId.toString(), cantidad, idTerapiaSolicita, stockActual)
      .subscribe({
        next: () => {
          console.log('Solicitud de stock enviada exitosamente.');
          this.onRequestComplete.emit();
        },
        error: (error) => {
          console.error('Error al enviar la solicitud:', error);
        },
        complete: () => {
          this.loadingService.stopLoading();
          this.close();
        }
      });
  }

}
