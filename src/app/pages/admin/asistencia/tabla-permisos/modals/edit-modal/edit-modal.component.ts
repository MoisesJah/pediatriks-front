import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FlatpickrDefaultsInterface, FlatpickrModule } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { map, Observable } from 'rxjs';
import { PermisoPersonalService } from 'src/app/services/asistencia/permisos/permiso-personal.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FlatpickrModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent {
  modal = inject(NgbModal);
  permisoService = inject(PermisoPersonalService);
  personalService = inject(PersonalService);
  isLoading = inject(LoadingService).isLoading;
  @Output() onSaveComplete = new EventEmitter<void>();

  form: FormGroup;

  permisoId: string | undefined;

  optionsInicio: FlatpickrDefaultsInterface = {
    locale: Spanish,
    altFormat: 'd/m/Y',
    altInput: true,
    monthSelectorType: 'dropdown',
  };

  optionsFin: FlatpickrDefaultsInterface = {
    ...this.optionsInicio,
    minDate: '',
  };

  startDateChange(event: any) {
    const { selectedDates } = event;

    flatpickr('#end_date', {
      locale: Spanish,
      altFormat: 'd/m/Y',
      altInput: true,
      minDate: selectedDates[0],
    });
  }

  personalList: Observable<any> = new Observable();
  tipoPermisoList = new Observable();

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
    this.getPermiso();
    this.gettipoPermisoList();
  }

  getPermiso() {
    this.permisoService
      .getById(this.permisoId!)
      .pipe(
        map((resp: any) => resp.data),
        untilDestroyed(this)
      )
      .subscribe((permiso) => {
        this.form.patchValue({
          fecha_inicio: permiso.fecha_inicio,
          fecha_fin: permiso.fecha_fin,
          notas: permiso.notas,
          id_personal: permiso.id_personal,
          id_permiso: permiso.id_permiso,
        });


      });
  }

  ngAfterViewInit(): void {
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
      map((resp: any) => resp.data),
      untilDestroyed(this)
    );
  }

  crearPermiso() {
    console.log(this.form.value);
    // if (this.form.valid) {
    //   this.permisoService
    //     .update(this.permisoId!, this.form.value)
    //     .pipe(untilDestroyed(this))
    //     .subscribe({
    //       next: () => {
    //         this.onSaveComplete.emit();
    //         this.close();
    //       },
    //       error: (error) => {
    //         console.log(error);
    //       },
    //     });
    // }
  }
}
