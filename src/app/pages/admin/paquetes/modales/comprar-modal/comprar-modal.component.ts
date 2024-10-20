import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  @Input() paqueteId: string | { id_paquetes: string } | null = null;
  @Output() onSaveComplete = new EventEmitter<void>();

  usuariosList: Observable<IUser[]> = new Observable();
  pacientesList: Observable<IPaciente[]> = new Observable();
  selectedUser: IUser | null = null;
  selectedPaciente: IPaciente | null = null;

  ngOnInit(): void {
    this.fetchUsuarios();
    this.loadPaqueteData();
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

  private loadPaqueteData() {
    let id: string | undefined;

    if (this.paqueteId) { // Verifica que no sea null o undefined
        if (typeof this.paqueteId === 'string') {
            id = this.paqueteId;
        } else if (typeof this.paqueteId === 'object' && this.paqueteId.id_paquetes) {
            id = this.paqueteId.id_paquetes;
        }
    }

    console.log('ID del paquete:', id); // Verificar el ID

    if (id) {
        this.paqueteService.getById(id).subscribe({
            next: (paquete) => {
                console.log('Paquete cargado:', paquete);
                // Aquí puedes manejar los datos del paquete si es necesario
            },
            error: (err) => {
                console.error('Error al cargar datos del paquete:', err);
            },
        });
    } else {
        console.error('ID del paquete no proporcionado');
    }
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

  compareUsers(user1: IUser, user2: IUser): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  close() {
    this.modal.dismissAll();
  }

  purchase() {

    if (this.paqueteId === null) {
        console.error('ID del paquete no está disponible');
        alert('Por favor, selecciona un paquete válido.');
        return;
    }

    const id = typeof this.paqueteId === 'string' ? this.paqueteId : this.paqueteId.id_paquetes;

    if (!id) {
        console.error('ID del paquete no está disponible');
        alert('Por favor, selecciona un paquete válido.');
        return;
    }

    if (!this.selectedUser) {
        console.error('Usuario no seleccionado');
        alert('Por favor, selecciona un usuario.');
        return;
    }

    if (!this.selectedPaciente) {
        console.error('Paciente no seleccionado');
        alert('Por favor, selecciona un paciente.');
        return;
    }

    const pacienteId = this.selectedPaciente.id_paciente;

    this.paqueteService.purchase(id, pacienteId).subscribe({
        next: () => {
            console.log('Compra realizada con éxito');
            this.onSaveComplete.emit();
            this.modal.dismissAll();
        },
        error: (err) => {
            console.error('Error al comprar paquete:', err);
            alert('Ocurrió un error al realizar la compra. Inténtalo de nuevo.');
        }
    });
}

}
