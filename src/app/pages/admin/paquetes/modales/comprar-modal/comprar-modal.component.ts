import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../../../../services/user/user.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { IPaciente } from 'src/app/models/paciente';
import { IUser } from './../../../../../models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-comprar-modal',
  templateUrl: './comprar-modal.component.html',
  styleUrls: ['./comprar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgSelectModule]
})
export class ComprarModalComponent {
  modal = inject(NgbModal);
  paqueteService = inject(PaqueteService);
  usuarioService = inject(UserService);
  pacienteService = inject(PacienteService);
  isLoading = inject(LoadingService).isLoading;

  @Input() paqueteId: string | { id_paquete: string } = '';
  @Output() onSaveComplete = new EventEmitter<void>();

  usuariosList: Observable<IUser[]> = new Observable();
  pacientesList: Observable<IPaciente[]> = new Observable();
  selectedUser: IUser | null = null;
  selectedPaciente: IPaciente | null = null;


  constructor() {
    this.fetchUsuarios();
  }

  private fetchUsuarios() {
    this.usuariosList = this.usuarioService.getPacientes().pipe(
      untilDestroyed(this),
      map((resp) => resp.data || []),
      catchError((error) => {
        console.error('Error al buscar usuarios:', error);
        return of([]);
      })
    );
  }

  onUserSelect(user: IUser) {
    this.selectedUser = user;
    this.loadPacientesByUser(user.id);
  }

  private loadPacientesByUser(userId: number) {
    this.pacientesList = this.pacienteService.getAll().pipe(
      map((resp) => resp.data.filter(paciente => paciente.id === userId)),
      catchError((error) => {
        console.error('Error al cargar pacientes:', error);
        return of([]);
      })
    );
  }

  close() {
    this.modal.dismissAll();
  }

  purchase() {
    const id = typeof this.paqueteId === 'string' ? this.paqueteId : this.paqueteId.id_paquete;
    if (id && this.selectedUser && this.selectedPaciente) {

      const pacienteId = this.selectedPaciente.id_paciente;

      this.paqueteService.purchase(id, pacienteId).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        },
        error: (err) => {
          console.error('Error al comprar paquete:', err);
        }
      });
    } else {
      console.error('ID del usuario o paciente no proporcionados');
    }
  }
}
