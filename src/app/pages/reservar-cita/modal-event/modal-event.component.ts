import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { ModalEditComponent } from './modal-edit/modal-edit.component'; // Asegúrate de importar el componente de edición
import { map, Observable } from 'rxjs';
import { Terapia } from 'src/app/models/terapia';
import { Sede } from 'src/app/models/sede';
import { IPaciente } from 'src/app/models/paciente';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { Personal } from 'src/app/models/personal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TipoCita } from 'src/app/models/tipocita';
import { TipocitaService } from 'src/app/services/tipocita/tipocita.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.scss'],
})
export class ModalCreateEventComponent implements OnInit, AfterViewInit {
  @Input() event: CalendarEvent | null = null;
  @Output() eventSubmitted = new EventEmitter<CalendarEvent>();
  @Output() eventDeleted = new EventEmitter<string>();

  terapiaService = inject(TerapiaService);
  sedesService = inject(SedesService);
  personalService = inject(PersonalService);
  pacienteService = inject(PacienteService);
  tipoCitaService = inject(TipocitaService);
  paquetesService = inject(PaqueteService);
  isLoading = inject(LoadingService).isLoading;

  @ViewChild('startTimePicker') startTimePicker!: ElementRef;
  @ViewChild('endTimePicker') endTimePicker!: ElementRef;
  @ViewChild('datePicker') datePicker!: ElementRef;

  terapiasList: Observable<Terapia[]> = new Observable();
  sedesList: Observable<Sede[]> = new Observable();
  pacientesList: Observable<IPaciente[]> = new Observable();
  personalList: Observable<Personal[]> = new Observable();
  tipoCitasList: Observable<TipoCita[]> = new Observable();
  paquetesList: Observable<any> = new Observable();

  eventForm: FormGroup;
  editEventForm: FormGroup;
  therapyOptions: string[] = [
    'Psicología',
    'Lenguaje',
    'Ocupacional',
    'Física',
    'Neuro',
    'Pediasuit',
  ];
  patientOptions: string[] = ['Juan', 'Pedro', 'Maria'];
  doctorOptions: string[] = ['Dr. A', 'Dr. B', 'Dr. C']; // Opciones para los doctores
  minDate: string;
  isEditMode: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    const today = new Date();
    this.minDate = this.formatDate(today);

    this.eventForm = this.fb.group({
      id_paciente: [null, Validators.required],
      // id_terapias: [null, Validators.required],
      // id_personal: [null, Validators.required],
      id_sede: [null, Validators.required],
      id_tipocita: [null, Validators.required],
      terapias: this.fb.array([this.createTerapia()]),
      selectedOptions: this.fb.array([]),
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: [''],
      endTime: [''],
    });

    this.editEventForm = this.fb.group({
      therapyType: ['', Validators.required],
      doctor: ['', Validators.required], // Campo de selección de doctor
      selectedPatient: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: [''],
      endTime: [''],
    });
  }

  options = [
    { label: 'L', value: '1' },
    { label: 'M', value: '2' },
    { label: 'MI', value: '3' },
    { label: 'J', value: '4' },
    { label: 'V', value: '5' },
  ];

  get selectedOptions(): FormArray {
    return this.eventForm.get('selectedOptions') as FormArray;
  }

  toggleOption(option: { label: string; value: string }) {
    const selectedButtons = this.eventForm.get('selectedOptions') as FormArray;
    const index = selectedButtons.value.findIndex((selectedButton:any) => selectedButton === option.value);
  
    if (index === -1) {
      selectedButtons.push(this.fb.control(option.value));
    } else {
      selectedButtons.removeAt(index);
    }

    console.log(selectedButtons.value);
  }

  isOptionSelected = (option: { label: string; value: string }) => {
    const selectedValues = (this.eventForm.get('selectedOptions') as FormArray).value;
    return selectedValues.includes(option.value);
  };

  createTerapia() {
    return this.fb.group({
      id_terapia: [null, Validators.required],
      id_personal: [null, Validators.required],
    });
  }

  get terapias() {
    return this.eventForm.get('terapias') as FormArray;
  }

  addInfoTerapia() {
    this.terapias.push(this.createTerapia());
  }

  removeInfoTerapia(i: number) {
    this.terapias.removeAt(i);
  }

  ngOnInit() {
    
    this.loadTerapias();
    this.loadSedes();
    this.loadPacientes();
    this.loadPersonal();
    this.loadTipoCitas();
    this.loadPaquetes();
  }

  loadPaquetes() {
    this.paquetesList = this.paquetesService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadTerapias() {
    this.terapiasList = this.terapiaService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadSedes() {
    this.sedesList = this.sedesService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadTipoCitas() {
    this.tipoCitasList = this.tipoCitaService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadPacientes() {
    this.pacientesList = this.pacienteService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadPersonal() {
    this.personalList = this.personalService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  ngAfterViewInit() {
    if (this.datePicker && this.datePicker.nativeElement) {
      flatpickr(this.datePicker.nativeElement, {
        locale: Spanish,
        mode: 'multiple',
        dateFormat: 'Y-m-d',
        minDate: this.minDate,
      });
    }
    if (this.startTimePicker && this.startTimePicker.nativeElement) {
      flatpickr(this.startTimePicker.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
      });
    }
    if (this.endTimePicker && this.endTimePicker.nativeElement) {
      flatpickr(this.endTimePicker.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
      });
    }
  }

  initializeForms() {
    if (this.event) {
      // this.eventForm.patchValue({
      //   therapyType: this.event.therapyType || '',
      //   doctor: this.event.doctor || '', // Valor del doctor
      //   startDate: this.formatDate(new Date(this.event.start)),
      //   endDate: this.event.end
      //     ? this.formatDate(new Date(this.event.end))
      //     : '',
      //   startTime: this.extractTime(this.event.start),
      //   endTime: this.event.end ? this.extractTime(this.event.end) : '',
      //   selectedPatient: this.event.selectedPatient || '',
      // });

      this.editEventForm.patchValue({
        therapyType: this.event.therapyType || '',
        doctor: this.event.doctor || '', // Valor del doctor
        startDate: this.formatDate(new Date(this.event.start)),
        endDate: this.event.end
          ? this.formatDate(new Date(this.event.end))
          : '',
        startTime: this.extractTime(this.event.start),
        endTime: this.event.end ? this.extractTime(this.event.end) : '',
        selectedPatient: this.event.selectedPatient || '',
      });
    }
  }

  openEditModal() {
    // Cierra el modal actual
    this.activeModal.close();

    // Abre el modal de edición
    setTimeout(() => {
      const modalRef = this.modalService.open(ModalEditComponent, {
        size: 'lg',
      });
      modalRef.componentInstance.event = this.event;
      modalRef.componentInstance.isEditMode = true;

      // Suscríbete al evento de actualización del evento
      modalRef.componentInstance.eventUpdated.subscribe(
        (updatedEvent: CalendarEvent) => {
          // Aquí puedes manejar la lógica de actualización, como emitir eventos o actualizar datos
          this.eventSubmitted.emit(updatedEvent);
          console.log('Event updated:', updatedEvent);
        }
      );
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

    selectedDates.forEach((date) => {
      const startDateTime = this.combineDateTime(
        date.trim(),
        this.eventForm.value.startTime
      );
      const endDateTime = this.combineDateTime(
        date.trim(),
        this.eventForm.value.endTime || this.eventForm.value.startTime
      );

      const eventToSubmit: CalendarEvent = {
        id: this.event ? this.event.id : this.generateId(),
        title: this.eventForm.value.therapyType,
        start: startDateTime,
        end: endDateTime,
        description: this.eventForm.value.eventDescription,
        therapyType: this.eventForm.value.therapyType,
        doctor: this.eventForm.value.doctor, // Añadir el doctor
        selectedPatient: this.eventForm.value.selectedPatient,
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
      therapyType: this.editEventForm.value.therapyType,
      doctor: this.editEventForm.value.doctor, // Añadir el doctor
      selectedPatient: this.editEventForm.value.selectedPatient,
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
