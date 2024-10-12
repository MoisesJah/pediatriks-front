import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { map, Observable, Subscription } from 'rxjs';
import { IPaciente } from 'src/app/models/paciente';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-comprar-modal-usuarios',
  templateUrl: './comprar-modal.component.html',
  styleUrls: ['./comprar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, CommonModule,NgSelectModule]
})
export class ComprarModalComponent {
  modal = inject(NgbModal);
  paqueteService = inject(PaqueteService);
  pacienteService = inject(PacienteService);
  isLoading$ = inject(LoadingService).isLoading; // Cambiado a observable

  @Input() paqueteId: string | { id_paquete: string } = '';
  @Output() onSaveComplete = new EventEmitter<void>();

  pacientesList: Observable<IPaciente[]> = new Observable();
  selectedPatient: string | null = null; // Variable para el paciente seleccionado

  isLoading: boolean = false; // Variable para almacenar el estado de carga
  subscription: Subscription;

  constructor() {
    this.fetchPacientes(); // Cargar los pacientes al inicializar el componente

    // Suscribirse a isLoading$
    this.subscription = this.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  get isPurchaseDisabled(): boolean {
    return this.isLoading || !this.selectedPatient;
  }

  private fetchPacientes() {
    this.pacientesList = this.pacienteService.getAll().pipe(
      untilDestroyed(this),
      map((resp) => {
        return resp.data || [];
      })
    );
  }

  close() {
    this.modal.dismissAll();
    this.subscription.unsubscribe(); // Desuscribirse al cerrar
  }

  purchase() {
    const id = typeof this.paqueteId === 'string' ? this.paqueteId : this.paqueteId.id_paquete;
    if (id && this.selectedPatient) {
      this.paqueteService.purchase(id, this.selectedPatient).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        },
        error: (err) => {
          console.error('Error al comprar paquete:', err);
        }
      });
    } else {
      console.error('ID del paquete o paciente no proporcionados');
    }
  }
}
