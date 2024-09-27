import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [ReactiveFormsModule,FlatpickrModule,NgSelectModule,CommonModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent {
  isLoading = inject(LoadingService).isLoading;
  modal = inject(NgbModal);

  createForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      id_sede: [null, Validators.required],
      id_paciente: [null, Validators.required],
      // id_terapia: [null, Validators.required],
      id_personal: [null, Validators.required],
      id_tipocita: [null, Validators.required],
      id_paquete: [null],
      fecha_inicio: [null, Validators.required],
      hora_inicio: [null, Validators.required],
      hora_fin: [null, Validators.required],
      descripcion: [null],
      paquete: [null],
      num_sesiones: [null],
      recurrencia: this.fb.array([]),
    });
  }

  closeModal() {
    this.modal.dismissAll();
  }
}
