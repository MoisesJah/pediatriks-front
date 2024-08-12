import { AfterViewInit, Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@UntilDestroy()
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
})
export class CreateModalComponent implements OnInit, OnDestroy {
  modal = inject(NgbActiveModal);
  pacienteForm: FormGroup;
  isLoading = inject(LoadingService).isLoading;
  pacienteService = inject(PacienteService);

  userId: number | undefined;

  @Output() onSaveComplete = new EventEmitter();
  
  ngOnInit(): void {
  }
  

  ngOnDestroy(): void {}

  constructor(private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      fecha_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  close() {
    this.modal.close();
  }

  save() {
    this.pacienteService.create({
      ...this.pacienteForm.value,
      id: this.userId
    }).subscribe(() => {
      this.onSaveComplete.emit();
      this.modal.close();
    })
  }
  
  selectUserId(event: any) {
    this.userId = event.value
    console.log(event)
  }
}
