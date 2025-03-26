import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  FlatpickrDefaultsInterface,
  FlatpickrModule,
} from 'angularx-flatpickr';
import { map, Observable } from 'rxjs';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Component({
  selector: 'app-create-asistencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FlatpickrModule],
  templateUrl: './create-asistencia.component.html',
})
export class CreateAsistenciaComponent implements OnInit {
  modal = inject(NgbActiveModal);
  asistenciaService = inject(AsistenciaService);
  isLoading = inject(LoadingService).isLoading;
  personalService = inject(PersonalService);
  toast = inject(ToastrService);

  form: FormGroup;

  @Output() onSaveComplete = new EventEmitter();

  optionsFecha: FlatpickrDefaultsInterface = {
    locale: Spanish,
    altFormat: 'd/m/Y',
    altInput: true,
    monthSelectorType: 'dropdown',
    minDate: new Date(),
  };

  isInasistencia = false;

  optionsHora: FlatpickrDefaultsInterface = {
    locale: Spanish,
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    minuteIncrement: 1,
    minTime: '08:00',
    defaultHour: 8,
    maxTime: '20:00',
  };

  close() {
    this.modal.close();
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id_personal: [null, Validators.required],
      id_status: [null, Validators.required],
      fecha: ['', Validators.required],
      hora_asistencia: [''],
      observaciones: [''],
    });
  }

  personalList = new Observable();
  statusList = new Observable();

  ngOnInit(): void {
    this.getPersonalList();
    this.getStatusList();
  }

  statusChange(event: any) {
    console.log(event);
    this.isInasistencia = event.nombre === 'inasistencia';
    const hora = this.form.get('hora_asistencia');

    if (this.isInasistencia) {
      hora?.reset();
    } else {
      hora?.setValidators(Validators.required);
    }
    hora?.updateValueAndValidity();
  }

  getPersonalList() {
    this.personalList = this.personalService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  getIcon(name: string) {
    switch (name) {
      case 'asistió':
        return 'h-10px w-10px bg-success rounded-pill';
      case 'tardanza':
        return 'h-10px w-10px bg-warning rounded-pill';
      case 'inasistencia':
        return 'h-10px w-10px bg-danger rounded-pill';
      case 'justificado':
        return 'h-10px w-10px bg-primary bg-opacity-75 rounded-pill';
      default:
        return '';
    }
  }

  getStatusList() {
    this.statusList = this.asistenciaService
      .getStatusList()
      .pipe(untilDestroyed(this));
  }

  create() {
    if (this.form.valid) {
      this.asistenciaService
        .create(this.form.value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.onSaveComplete.emit();
            this.close();
          },
          error: (error) => {
            if (error.error.errors) {
              const errors = Object.values(error.error.errors).join('\n');
              this.toast.error(errors, 'Error');
            }else{
              this.toast.error('Ocurrio un error al crear la asistencia', 'Error');
            }
          },
        });
    }
  }
}
