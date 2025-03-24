import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  FlatpickrDefaultsInterface,
  FlatpickrModule,
} from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { map, Observable } from 'rxjs';
import { PermisoPersonalService } from 'src/app/services/asistencia/permisos/permiso-personal.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

@UntilDestroy()
@Component({
  selector: 'app-create-permiso',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FlatpickrModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit, AfterViewInit {
  modal = inject(NgbModal);
  permisoService = inject(PermisoPersonalService);
  personalService = inject(PersonalService);
  isLoading = inject(LoadingService).isLoading;
  @Output() onSaveComplete = new EventEmitter<void>();

  form: FormGroup;

  optionsInicio: FlatpickrDefaultsInterface = {
    locale: Spanish,
    altFormat: 'd/m/Y',
    altInput: true,
    monthSelectorType: 'dropdown',
  };

  optionsFin: FlatpickrDefaultsInterface = {
    ...this.optionsInicio,
    minDate: '',
  }

  startDateChange(event: any) {
    const {selectedDates} = event;

    flatpickr('#end_date', {
      locale: Spanish,
      altFormat: 'd/m/Y',
      altInput: true,
      minDate: selectedDates[0]
    });
  }

  personalList: Observable<any> = new Observable();
  tipoPermisoList = new Observable()

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      notas: [''],
      id_personal: [null, Validators.required],
      id_permiso: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPersonalList();
    this.gettipoPermisoList();
  }

  ngAfterViewInit(): void {
    flatpickr('#end_date',{
      locale: Spanish,
      altFormat: 'd/m/Y',
      altInput: true,
      minDate: this.form.get('fecha_inicio')?.value
    });
  }

  close() {
    this.modal.dismissAll();
  }

  getPersonalList() {
    this.personalList = this.personalService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  gettipoPermisoList() {
    this.tipoPermisoList = this.permisoService.tipoPermisos().pipe(
      map((resp:any) => resp.data),
      untilDestroyed(this)
    );
  }

  crearPermiso() {}
}
