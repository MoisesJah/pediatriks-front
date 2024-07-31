import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { ModalEditComponent } from './modal-edit/modal-edit.component'; // Asegúrate de importar el componente de edición

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.scss']
})
export class ModalEventComponent implements OnInit, AfterViewInit {
  @Input() event: CalendarEvent | null = null;
  @Output() eventSubmitted = new EventEmitter<CalendarEvent>();
  @Output() eventDeleted = new EventEmitter<string>();

  @ViewChild('startTimePicker') startTimePicker!: ElementRef;
  @ViewChild('endTimePicker') endTimePicker!: ElementRef;
  @ViewChild('datePicker') datePicker!: ElementRef;

  eventForm: FormGroup;
  editEventForm: FormGroup;
  therapyOptions: string[] = ['Psicología', 'Lenguaje', 'Ocupacional', 'Física', 'Neuro', 'Pediasuit'];
  patientOptions: string[] = ['Juan', 'Pedro', 'Maria'];
  minDate: string;
  isEditMode: boolean = false;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private fb: FormBuilder) {
    const today = new Date();
    this.minDate = this.formatDate(today);

    this.eventForm = this.fb.group({
      therapyType: ['', Validators.required],
      eventDescription: [''],
      selectedPatient: ['', Validators.required],
      eventLocation: [''],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: [''],
      endTime: ['']
    });

    this.editEventForm = this.fb.group({
      therapyType: ['', Validators.required],
      eventDescription: [''],
      selectedPatient: ['', Validators.required],
      eventLocation: [''],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: [''],
      endTime: ['']
    });
  }

  ngOnInit() {
    if (this.event) {
      this.initializeForms();
    }
  }

  ngAfterViewInit() {
    if (this.datePicker && this.datePicker.nativeElement) {
      flatpickr(this.datePicker.nativeElement, {
        locale: Spanish,
        weekNumbers: true,
        minDate: this.minDate
      });
    }
    if (this.startTimePicker && this.startTimePicker.nativeElement) {
      flatpickr(this.startTimePicker.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i"
      });
    }
    if (this.endTimePicker && this.endTimePicker.nativeElement) {
      flatpickr(this.endTimePicker.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i"
      });
    }
  }

  initializeForms() {
    if (this.event) {
      this.eventForm.patchValue({
        therapyType: this.event.therapyType || '',
        eventDescription: this.event.description || '',
        eventLocation: this.event.location || '',
        startDate: this.formatDate(new Date(this.event.start)),
        endDate: this.event.end ? this.formatDate(new Date(this.event.end)) : '',
        startTime: this.extractTime(this.event.start),
        endTime: this.event.end ? this.extractTime(this.event.end) : '',
        selectedPatient: this.event.selectedPatient || ''
      });

      this.editEventForm.patchValue({
        therapyType: this.event.therapyType || '',
        eventDescription: this.event.description || '',
        eventLocation: this.event.location || '',
        startDate: this.formatDate(new Date(this.event.start)),
        endDate: this.event.end ? this.formatDate(new Date(this.event.end)) : '',
        startTime: this.extractTime(this.event.start),
        endTime: this.event.end ? this.extractTime(this.event.end) : '',
        selectedPatient: this.event.selectedPatient || ''
      });
    }
  }

  openEditModal() {
    // Cierra el modal actual
    this.activeModal.close();

    // Abre el modal de edición
    setTimeout(() => {
      const modalRef = this.modalService.open(ModalEditComponent, { size: 'lg' });
      modalRef.componentInstance.event = this.event;
      modalRef.componentInstance.isEditMode = true;

      // Suscríbete al evento de actualización del evento
      modalRef.componentInstance.eventUpdated.subscribe((updatedEvent: CalendarEvent) => {
        // Aquí puedes manejar la lógica de actualización, como emitir eventos o actualizar datos
        this.eventSubmitted.emit(updatedEvent);
        console.log('Event updated:', updatedEvent);
      });
    }, 300); // Ajusta el tiempo si es necesario
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  submitEvent() {
    if (this.eventForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const selectedDates: string[] = this.eventForm.value.startDate.split(',');

    selectedDates.forEach(date => {
      const startDateTime = this.combineDateTime(date.trim(), this.eventForm.value.startTime);
      const endDateTime = this.combineDateTime(date.trim(), this.eventForm.value.endTime || this.eventForm.value.startTime);

      const eventToSubmit: CalendarEvent = {
        id: this.event ? this.event.id : this.generateId(),
        title: this.eventForm.value.therapyType,
        start: startDateTime,
        end: endDateTime,
        description: this.eventForm.value.eventDescription,
        location: this.eventForm.value.eventLocation,
        therapyType: this.eventForm.value.therapyType,
        selectedPatient: this.eventForm.value.selectedPatient
      };

      this.eventSubmitted.emit(eventToSubmit);
    });

    this.activeModal.close();
  }


  updateEvent() {
    if (this.editEventForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const startDateTime = this.combineDateTime(
      this.editEventForm.value.startDate,
      this.editEventForm.value.startTime
    );

    const endDateTime = this.combineDateTime(
      this.editEventForm.value.endDate || this.editEventForm.value.startDate,
      this.editEventForm.value.endTime || this.editEventForm.value.startTime
    );

    const eventToUpdate: CalendarEvent = {
      id: this.event!.id,
      title: this.editEventForm.value.therapyType,
      start: startDateTime,
      end: endDateTime,
      description: this.editEventForm.value.eventDescription,
      location: this.editEventForm.value.eventLocation,
      therapyType: this.editEventForm.value.therapyType,
      selectedPatient: this.editEventForm.value.selectedPatient
    };

    console.log('Event to update:', eventToUpdate);

    this.eventSubmitted.emit(eventToUpdate);
    this.activeModal.close();
  }

  deleteEvent() {
    if (this.event) {
      this.eventDeleted.emit(this.event.id);
      this.activeModal.close();
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private extractTime(dateStr: string): string {
    const date = new Date(dateStr);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private combineDateTime(date: string, time: string): string {
    return `${date}T${time}:00`;
  }

  private generateId(): string {
    return `${Math.random().toString(36).substr(2, 9)}`;
  }
}
