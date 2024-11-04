import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPaciente } from 'src/app/models/paciente';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { UserService } from 'src/app/services/user/user.service';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUser } from 'src/app/models/user';
import { GeneroService } from 'src/app/services/genero/genero.service';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { ParentescosService } from 'src/app/services/paciente/parentescos.service';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent implements AfterViewInit, OnDestroy, OnInit {
  modal = inject(NgbActiveModal);
  pacienteForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;
  pacienteService = inject(PacienteService);
  toast = inject(ToastrService);
  userService = inject(UserService);
  generoService = inject(GeneroService);
  parentescoService = inject(ParentescosService);

  userList: Observable<IUser[]> = new Observable();
  es = Spanish.es;
  paciente?: IPaciente;
  generos: Observable<any> = new Observable();
  parentescos: Observable<any> = new Observable();

  @Output() onSaveComplete = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      fecha_nacimiento: ['', Validators.required],
      id: [null, Validators.required],
      id_genero: [null, Validators.required],
      id_parentesco: [null, Validators.required],
      pos_hijo: [''],
      colegio: [''],
    });
  }

  ngOnInit(): void {
    this.pacienteService
      .getById(this.paciente?.id_paciente!)
      .pipe(untilDestroyed(this))
      .subscribe((paciente) => {
        this.pacienteForm.patchValue(paciente.data);
      });
  }

  ngAfterViewInit(): void {
    this.userList = this.userService.getPacientes().pipe(
      untilDestroyed(this),
      map((response) => {
        const usersData = response as { data: IUser[] };
        return usersData.data;
      })
    );

    this.generos = this.generoService.getAll().pipe(
      untilDestroyed(this),
      map((response) => {
        const generosData = response as { data: any };
        return generosData.data;
      })
    );

    this.parentescos = this.parentescoService.getAll().pipe(
      untilDestroyed(this),
      map((resp) => resp.data)
    );
  }

  ngOnDestroy(): void {}

  close() {
    this.modal.close();
  }

  edit() {
    const submitData = this.pacienteForm.value;
    const id = this.paciente?.id_paciente!;

    if (this.pacienteForm.valid) {
      this.pacienteService.update(submitData, id).subscribe({
        next: () => {
          this.onSaveComplete.emit();
          this.modal.close();
        },
        error: (err) => {
          if (err.error.errors) {
            const errors = Object.values(err.error.errors).join('\n');
            this.toast.error(errors, 'Error');
          } else {
            this.toast.error('Ocurrio un error al crear el paciente', 'Error');
          }
        },
      });
    }

  }
}
