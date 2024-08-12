import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPaciente } from 'src/app/models/paciente';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss'
})
export class EditModalComponent {
  modal = inject(NgbActiveModal);
  pacienteForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;
  pacienteService = inject(PacienteService);

  userId: number | undefined;

  paciente?: IPaciente 

  @Output() onSaveComplete = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      fecha_nacimiento: ['', Validators.required],
      genero: [''],
      direccion: ['', Validators.required],
      pos_hijo: [''],
      colegio: ['']
    });
  }

  close() {
    this.modal.close();
  }

  edit(){
    
  }

  selectUserId(event: any) {
    this.userId = event.value
  }

  selectGenero(event: any) {
    this.pacienteForm.patchValue({
      genero: event.value
    })
  }
}
