import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent {
  modal = inject(NgbModal);
  terapiasService = inject(TerapiaService);

  @Output() onSaveComplete = new EventEmitter();

  terapiaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.terapiaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  save() {
    this.terapiasService
      .create(this.terapiaForm.value)
      .subscribe(() => {
        this.onSaveComplete.emit();
        this.modal.dismissAll();
      });
  }

  close() {
    this.modal.dismissAll();
  }
}
