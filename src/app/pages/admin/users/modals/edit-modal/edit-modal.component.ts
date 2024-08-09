import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss'
})
export class EditModalComponent {
  modal = inject(NgbModal)
  userService = inject(UserService)
  userForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;
  userId: number | undefined;

  // user = {} as IUser
  @Output() onSaveComplete = new EventEmitter()

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
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }


  close() {
    this.modal.dismissAll();
  }


  edit(user: IUser, id: number) {
    this.userService.update(user, id).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.dismissAll();
    });
  }
}