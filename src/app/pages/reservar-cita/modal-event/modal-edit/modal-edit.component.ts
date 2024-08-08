import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit, AfterViewInit {
  @Input() event: CalendarEvent | null = null;
  @Input() isEditMode: boolean = false;
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();

  editEventForm: FormGroup;
  therapyOptions: string[] = ['Psicología', 'Lenguaje', 'Ocupacional', 'Física', 'Neuro', 'Pediasuit'];
  patientOptions: string[] = ['Juan', 'Pedro', 'Maria'];
  doctorOptions: string[] = ['Dr. A', 'Dr. B', 'Dr. C'];

  @ViewChild('editDatePicker') editDatePicker!: ElementRef;
  @ViewChild('editStartTimePicker') editStartTimePicker!: ElementRef;
  @ViewChild('editEndTimePicker') editEndTimePicker!: ElementRef;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.editEventForm = this.fb.group({
      therapyType: ['', Validators.required],
      eventDescription: [''],
      selectedPatient: ['', Validators.required],
      eventLocation: [''],
      doctor: ['', Validators.required], // Añadir campo doctor aquí
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: [''],
      endTime: ['']
    });
  }

  ngOnInit() {
    if (this.event) {
      this.initializeForm();
    }
  }

  ngAfterViewInit() {
    // Initialize Flatpickr after the view has initialized
    flatpickr(this.editDatePicker.nativeElement, {
      dateFormat: 'Y-m-d',
      locale: Spanish
    });

    flatpickr(this.editStartTimePicker.nativeElement, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      onChange: (selectedDates: Date[], dateStr: string) => {
        this.editEventForm.controls.startTime.setValue(dateStr);
      }
    });

    flatpickr(this.editEndTimePicker.nativeElement, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      onChange: (selectedDates: Date[], dateStr: string) => {
        this.editEventForm.controls.endTime.setValue(dateStr);
      }
    });
  }

  initializeForm() {
    if (this.event) {
      this.editEventForm.patchValue({
        therapyType: this.event.therapyType || '',
        eventDescription: this.event.description || '',
        eventLocation: this.event.location || '',
        doctor: this.event.doctor || '', // Añadir valor del campo doctor aquí
        startDate: this.formatDate(new Date(this.event.start)),
        startTime: this.extractTime(this.event.start),
        endTime: this.event.end ? this.extractTime(this.event.end) : '',
        selectedPatient: this.event.selectedPatient || ''
      });
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

  closeModal() {
    this.activeModal.dismiss(); // Cierra el modal sin realizar cambios
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

    const endDateTime = this.editEventForm.value.endDate
      ? this.combineDateTime(this.editEventForm.value.endDate, this.editEventForm.value.endTime)
      : startDateTime;

    const updatedEvent: CalendarEvent = {
      id: this.event ? this.event.id : this.generateId(),
      title: this.editEventForm.value.therapyType,
      start: startDateTime,
      end: endDateTime,
      description: this.editEventForm.value.eventDescription,
      location: this.editEventForm.value.eventLocation,
      therapyType: this.editEventForm.value.therapyType,
      selectedPatient: this.editEventForm.value.selectedPatient,
      doctor: this.editEventForm.value.doctor // Añadir campo doctor aquí
    };

    console.log('Updated event:', updatedEvent); // Añade este log para verificar el evento actualizado

    this.eventUpdated.emit(updatedEvent); // Emite el evento actualizado
    this.activeModal.close(); // Cierra el modal después de actualizar el evento
  }

  private combineDateTime(date: string, time: string): string {
    return `${date}T${time}:00`; // Combina fecha y hora
  }

  private generateId(): string {
    return `${Math.random().toString(36).substr(2, 9)}`;
  }
}
