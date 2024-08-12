import { AfterViewInit, Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IPaciente } from 'src/app/models/paciente';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';


@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
})
export class CreateModalComponent{
  modal = inject(NgbActiveModal);
  pacienteForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;
  pacienteService = inject(PacienteService);

  userId: number | undefined;

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

  save() {
    const submitData = {
      ...this.pacienteForm.value,
      id: this.userId
    } satisfies IPaciente

    this.pacienteService.create(submitData).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.close();
    })
    
    console.log(submitData)
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
