import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
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
  tipouserService = inject(TipouserService);
  userForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;

  tipoUserList: Observable<any> = new Observable();

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
    });
  }

  ngOnInit(): void {
    this.loadTipousers();
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

  save() {
    if (this.userForm.valid) {
      this.userService.create(this.userForm.value).subscribe(() => {
        this.onSaveComplete.emit();
        this.modal.dismissAll();
      });
    }
  }
}
