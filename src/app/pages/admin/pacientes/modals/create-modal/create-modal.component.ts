import { AfterViewInit, Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUser } from 'src/app/models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { UserService } from 'src/app/services/user/user.service';

@UntilDestroy()
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
})
export class CreateModalComponent implements OnInit, OnDestroy, AfterViewInit {
  modal = inject(NgbActiveModal);
  pacienteForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;
  pacienteService = inject(PacienteService);
  userService = inject(UserService);

  users: Array<IUser> = [];

  @Output() onSaveComplete = new EventEmitter();
  
  ngOnInit(): void {
    console.log(this.users);
  }

  ngAfterViewInit(): void {
    this.getUsers();

    console.log(this.users);
  }

  ngOnDestroy(): void {}

  constructor(private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      // telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      // correo: ['', [Validators.required, Validators.email]],
      // peso: ['', [Validators.required, Validators.min(0)]],
      // altura: ['', [Validators.required, Validators.min(0)]],
      // sueldo: ['', [Validators.required, Validators.min(0)]],
    });
  }

  close() {
    this.modal.close();
  }

  save() {
    this.pacienteService.create({
      ...this.pacienteForm.value,
      id:0
    }).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.close();
    })
  }
  getUsers() {
    this.userService.getAll().pipe(untilDestroyed(this)).subscribe((users) => {
      const response = users as { data: IUser[] };
        this.users = response.data || [];
        console.log(this.users);
    });
  }
}
