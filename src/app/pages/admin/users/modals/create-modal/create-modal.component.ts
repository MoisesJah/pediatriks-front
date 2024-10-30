import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { TipouserService } from 'src/app/services/tipouser/tipouser.service';
import { UserService } from 'src/app/services/user/user.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
})
export class CreateModalComponent implements OnInit {
  modal = inject(NgbModal);
  userService = inject(UserService);
  toast = inject(ToastrService);
  personalService = inject(PersonalService);
  tipouserService = inject(TipouserService);
  userForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;

  tipoUserList: Observable<any> = new Observable();
  personalList: Observable<any> = new Observable();

  isTipoTerapista: boolean = false;

  @Output() onSaveComplete = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[0-9]*'),
        ],
      ],
      id_tipousers: [null, Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      direccion: [''],
      id_personal: [null],
    });
  }

  ngOnInit(): void {
    this.loadTipousers();
    this.loadPersonal();
  }

  changeTipoUser(event: any) {
    this.isTipoTerapista = event && event?.nombre === 'terapista';

    if (this.isTipoTerapista) {

      this.userForm.get('id_personal')?.setValidators(Validators.required);
      this.userForm.get('id_personal')?.updateValueAndValidity();
    } else {
      this.userForm.get('id_personal')?.clearValidators();
      this.userForm.get('id_personal')?.updateValueAndValidity();
    }
  }

  changePersonal(event?: any) {
    if (event) {
      this.userForm.patchValue({
        name: event.nombre,
        email: event.correo,
        dni: event.dni,
        telefono: event.telefono,
      });
    } else {
      this.userForm.reset({
        name: '',
        email: '',
        dni: '',
        telefono: '',
      });
    }
  }

  generatePassword(): void {
    const length = 12;
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    this.userForm.get('password')?.patchValue(password);
  }

  close() {
    this.modal.dismissAll();
  }

  loadTipousers() {
    this.tipoUserList = this.tipouserService.getAll().pipe(
      map((response: any) => response.data),
      untilDestroyed(this)
    );
  }

  loadPersonal() {
   this.personalList = this.personalService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    )}

  save() {
    if (this.userForm.valid) {
      this.userService.create(this.userForm.value).subscribe({
        next: () => {
          this.close();
          this.onSaveComplete.emit();
        },
        error: (err) => {
          if (err.error.errors) {
            const errors = Object.values(err.error.errors).join('\n');
            this.toast.error(errors, 'Error');
          } else {
            this.toast.error('Ocurrio un error al crear el usuario', 'Error');
          }
        },
      });
    }
  }
}
