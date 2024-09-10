import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { map, Observable } from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { untilDestroyed } from '@ngneat/until-destroy';
import { LoadingService } from 'src/app/services/loading.service';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  @Input() event: CalendarEvent | null = null;
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();

  personalService = inject(PersonalService);
  isLoading = inject(LoadingService).isLoading;

  editEventForm: FormGroup;

  fechaOptions: FlatpickrDefaultsInterface = {
    locale: Spanish,
    altInput: true,
    altFormat: 'F j, Y',
  }
  
  horaInicioOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time24hr: true,
    altInput: true,
    altFormat: 'h:i K',
  }

  horaFinOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time24hr: true,
    altInput: true,
    altFormat: 'h:i K',
    minDate: this.event?.start
  }

  personalList: Observable<Personal[]> = new Observable();

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.editEventForm = this.fb.group({
      descripcion: [null],
      id_personal: [null],
      fecha_inicio: [null],
      fecha_fin: [null],
      hora_inicio: [null],
      hora_fin: [null],
      status: [null],
    });
  }

  ngOnInit() {
    this.loadPersonal();
  }

  loadPersonal() {
    this.personalList = this.personalService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  closeModal() {
    this.activeModal.dismiss(); // Cierra el modal sin realizar cambios
  }

  updateEvent() {
    this.activeModal.close(); // Cierra el modal después de actualizar el evento
  }
}
