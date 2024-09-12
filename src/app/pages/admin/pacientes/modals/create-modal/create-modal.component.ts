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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';
import { IPaciente } from 'src/app/models/paciente';
import { IUser } from 'src/app/models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { UserService } from 'src/app/services/user/user.service';
import { GeneroService } from 'src/app/services/genero/genero.service';
import Spanish from 'flatpickr/dist/l10n/es.js';

@UntilDestroy()
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
})
export class CreateModalComponent implements AfterViewInit, OnDestroy {
  modal = inject(NgbActiveModal);
  pacienteForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;
  pacienteService = inject(PacienteService);
  userService = inject(UserService);
  generoService = inject(GeneroService);

  userList: Observable<any> = new Observable();

  userId: number | undefined;
  es = Spanish.es;
  generos: Observable<any> = new Observable();

  @Output() onSaveComplete = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      fecha_nacimiento: ['', Validators.required],
      id: [null, Validators.required],
      id_genero: [null, Validators.required],
      direccion: ['', Validators.required],
      pos_hijo: [''],
      colegio: [''],
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
        const generosData = response as { data: any[] };
        return generosData.data;
      })
    )
  }

  ngOnDestroy(): void {}

  close() {
    this.modal.close();
  }

  save() {
    const submitData = this.pacienteForm.value;

    this.pacienteService.create(submitData).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.close();
    });

  }
}
