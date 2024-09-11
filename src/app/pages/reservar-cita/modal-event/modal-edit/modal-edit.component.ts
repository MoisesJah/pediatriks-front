import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { map, Observable } from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoadingService } from 'src/app/services/loading.service';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { SesionstatusService } from 'src/app/services/status/sesionstatus.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  @Input() event: CalendarEvent | null = null;
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();

  personalService = inject(PersonalService);
  statusService = inject(SesionstatusService);
  isLoading = inject(LoadingService).isLoading;

  editEventForm: FormGroup;

  personalList: Observable<Personal[]> = new Observable();
  statusList: Observable<any[]> = new Observable();

  fechaOptions: FlatpickrDefaultsInterface = {
    locale: {...Spanish},
    altInput: true,
    altFormat: 'd/m/Y',
  }
  
  horaInicioOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
  }

  horaFinOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
  }

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.editEventForm = this.fb.group({
      descripcion: [null],
      id_personal: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
      hora_inicio: [null],
      hora_fin: [null],
      status: [null],
      check_personal: [false],
    });
  }

  endTimeValidation() {
    const horaInicio = this.editEventForm.get('hora_inicio')?.value;
    const horaFin = this.editEventForm.get('hora_fin')?.value;
    if (horaFin < horaInicio) {
      this.editEventForm.get('hora_fin')?.setValue(horaInicio);
    }
  }

  ngOnInit() {
    this.loadPersonal();
    this.loadStatus();
    this.editEventForm.valueChanges.subscribe(() => this.endTimeValidation());
  }

  loadPersonal() {
    this.personalList = this.personalService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadStatus() {
    this.statusList = this.statusService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  closeModal() {
    this.activeModal.dismiss(); // Cierra el modal sin realizar cambios
  }

  updateEvent() {
    console.log(this.editEventForm.value); // Cierra el modal después de actualizar el evento
  }
}
