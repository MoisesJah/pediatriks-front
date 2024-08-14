import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPaciente } from 'src/app/models/paciente';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { generos } from '../genero.data';
import { UserService } from 'src/app/services/user/user.service';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUser } from 'src/app/models/user';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent implements AfterViewInit, OnDestroy {
  modal = inject(NgbActiveModal);
  pacienteForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;
  pacienteService = inject(PacienteService);
  userService = inject(UserService);

  userList: Observable<IUser[]> = new Observable();
  userId: number | undefined;

  paciente?: IPaciente;
  generos = generos;

  @Output() onSaveComplete = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      fecha_nacimiento: ['', Validators.required],
      id: ['', Validators.required],
      genero: [''],
      direccion: ['', Validators.required],
      pos_hijo: [''],
      colegio: [''],
    });
  }

  ngAfterViewInit(): void {
    this.userList = this.userService.getAll().pipe(
      untilDestroyed(this),
      map((response) => {
        const usersData = response as { data: IUser[] };
        return usersData.data;
      })
    );
  }

  ngOnDestroy(): void {}

  close() {
    this.modal.close();
  }

  edit() {
    const submitData = this.pacienteForm.value;
    const id = this.paciente?.id_paciente!;

    this.pacienteService.update(submitData, id).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.close();
    });

    console.log(submitData);
  }
}
