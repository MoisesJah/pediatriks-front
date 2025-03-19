import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { ToastrService } from 'ngx-toastr';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-comprar-modal',
  templateUrl: './comprar-modal.component.html',
  styleUrls: ['./comprar-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgSelectModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ComprarModalComponent {
  modal = inject(NgbModal);
  paqueteService = inject(PaqueteService);
  usuarioService = inject(UserService);
  toast = inject(ToastrService);
  pacienteService = inject(PacienteService);
  isLoading = inject(LoadingService).isLoading;
  form: FormGroup;
  metodosPago = [
    'Efectivo',
    'Yape',
    'BCP',
    'Interbank',
    'BBVA',
    'Transferencia',
  ];
  @Input() paqueteId: string | { id_paquetes: string } | null = null;
  @Output() onSaveComplete = new EventEmitter<void>();

  usuariosList: Observable<IUser[]> = new Observable();
  pacientesList: Observable<IPaciente[]> = new Observable();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usuarioId: [null, Validators.required],
      pacienteId: [null, Validators.required],
      metodo_pago: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUsuarios();
    this.loadPaqueteData();
  }

  private fetchUsuarios() {
    this.usuariosList = this.usuarioService.getUsersWithPacientes().pipe(
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

    if (this.paqueteId) {
      if (typeof this.paqueteId === 'string') {
        id = this.paqueteId;
      } else if (
        typeof this.paqueteId === 'object' &&
        this.paqueteId.id_paquetes
      ) {
        id = this.paqueteId.id_paquetes;
      }
    }

    if (id) {
      this.paqueteService.getById(id).subscribe({
        next: (paquete) => {
          console.log('Paquete cargado:', paquete);
        },
        error: (err) => {
          console.error('Error al cargar datos del paquete:', err);
        },
      });
    } else {
      console.error('ID del paquete no proporcionado');
    }
  }

  onChangeUser(user: IUser) {
    this.form.get('pacienteId')?.reset();
    this.loadPacientesByUser(user.id);
  }

  onPacienteSelect(paciente: IPaciente) {
    // console.log(paciente)
  }

  private loadPacientesByUser(userId: number) {
    this.pacientesList = this.pacienteService.getAll().pipe(
      map((resp) => resp.data.filter((paciente) => paciente.id === userId)),
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
    if (this.form.valid) {
      this.paqueteService
        .purchase({
          ...this.form.value,
          paqueteId: this.paqueteId,
        })
        .subscribe({
          next: () => {
            this.onSaveComplete.emit();
            this.modal.dismissAll();
          },
          error: (err) => {
            if (err.error.errors) {
              const errors = Object.values(err.error.errors).join('\n');
              this.toast.error(errors, 'Error');
            } else {
              this.toast.error('Ocurrió un error', 'Error ');
            }
          },
        });
    }
  }
}
