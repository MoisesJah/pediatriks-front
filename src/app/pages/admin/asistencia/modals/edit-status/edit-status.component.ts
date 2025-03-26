import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FlatpickrDefaultsInterface, FlatpickrModule } from 'angularx-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FlatpickrModule],
  templateUrl: './edit-status.component.html',
})
export class EditStatusComponent implements OnInit {
  modal = inject(NgbModal);
  isLoading = inject(LoadingService).isLoading;
  asistenciaService = inject(AsistenciaService);
  personalService = inject(PersonalService);
  toast = inject(ToastrService);

  id_asistencia = '';
  @Output() onSaveComplete = new EventEmitter();

  form: FormGroup;

  statusList = new Observable();
  personalList = new Observable();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id_personal: [null, Validators.required],
      id_status: [null, Validators.required],
      fecha: ['', Validators.required],
      hora_asistencia: [''],
      observaciones: [''],
    });
  }

  statusChange(event: any) {
    this.isInasistencia = event.nombre === 'inasistencia';
    const hora = this.form.get('hora_asistencia');

    if (this.isInasistencia) {
      hora?.reset();
    } else {
      hora?.setValidators(Validators.required);
    }
    hora?.updateValueAndValidity();
  }

  getRecord() {
    this.asistenciaService
      .getById(this.id_asistencia)
      .pipe(
        map((resp: any) => resp.data),
        untilDestroyed(this)
      )
      .subscribe((data: any) => {
        this.form.patchValue(data);
      });
  }

  getPersonalList() {
    this.personalList = this.personalService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  optionsFecha: FlatpickrDefaultsInterface = {
    locale: Spanish,
    altFormat: 'd/m/Y',
    altInput: true,
    monthSelectorType: 'dropdown',
    minDate: new Date().toISOString().split('T')[0],
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

  ngOnInit(): void {
    this.getStatusList();
    this.getRecord();
    this.getPersonalList();
  }

  close() {
    this.modal.dismissAll();
  }

  update() {
    if (this.form.valid) {
      this.asistenciaService
        .update(this.form.value, this.id_asistencia)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (data) => {
            this.onSaveComplete.emit();
            this.close();
          },
          error: (error) => {
            if (error.error.errors) {
              const errors = Object.values(error.error.errors).join('\n');
              this.toast.error(errors, 'Error');
            }else {
              this.toast.error('Ocurrio un error al actualizar la asistencia', 'Error');
            }
          },
        });
    }
  }

  getStatusList() {
    this.statusList = this.asistenciaService
      .getStatusList()
      .pipe(untilDestroyed(this));
  }
}
