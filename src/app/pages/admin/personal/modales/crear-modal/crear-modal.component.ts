import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-crear-modal',
  templateUrl: './crear-modal.component.html',
  styleUrls: ['./crear-modal.component.scss']
})
export class CrearModalComponent {
  modal = inject(NgbModal);
  personalService = inject(PersonalService);
  personalForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;

  @Output() onSaveComplete = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      correo: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      sueldo: ['', [Validators.required, Validators.min(0)]],
    });
  }

  close() {
    this.modal.dismissAll();
  }

  save() {
    if (this.personalForm.valid) {
      console.log(this.personalForm.value);
      this.personalService
        .create(this.personalForm.value)
        .subscribe(() => {
          this.onSaveComplete.emit();
          this.modal.dismissAll();
        });
    }
  }
}
