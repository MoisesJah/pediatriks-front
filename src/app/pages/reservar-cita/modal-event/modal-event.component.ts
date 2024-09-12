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
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { CitaService } from 'src/app/services/citas/cita.service';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import Spanish from 'flatpickr/dist/l10n/es.js';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.scss'],
})
export class ModalCreateEventComponent implements OnInit {
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
  citaService = inject(CitaService);

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
  minDate: string;
  es = Spanish.es;

  isCitaContinua = false;

  timeOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    // will be used since specific attribute is not provided
  };

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    const today = new Date();
    this.minDate = this.formatDate(today);

    this.eventForm = this.fb.group({
      id_paciente: [null, Validators.required],
      id_sede: [null, Validators.required],
      id_tipocita: [null, Validators.required],
      detalle: this.fb.array([this.createDetalle()]),
    });
  }

  options = [
    { label: 'L', value: 1 },
    { label: 'M', value: 2 },
    { label: 'MI', value: 3 },
    { label: 'J', value: 4 },
    { label: 'V', value: 5 },
  ];

  get detalle() {
    return this.eventForm.get('detalle') as FormArray;
  }

  changeTipoCita(event: any) {
    this.isCitaContinua = event?.nombre !== 'Evaluación';
    if (this.isCitaContinua) {
      this.detalle.controls.forEach((control) => {
        control.get('id_paquete')?.setValidators(Validators.required);
      })
    }
  }

  changePaquete(event: any, index: number) {
    const detalleArray = this.eventForm.get('detalle') as FormArray;
    const sesionesControl = detalleArray
      .at(index)
      ?.get('num_sesiones') as FormControl;
    sesionesControl.setValue(event?.cantidadsesiones);
  }

  toggleOption(option: { label: string; value: string }, index: number) {
    const detalleArray = this.eventForm.get('detalle') as FormArray;
    const recurrenciaControl = detalleArray
      .at(index)
      ?.get('recurrencia') as FormControl;
    const recurrenciaValue = recurrenciaControl.value as string[];

    const indexValue = recurrenciaValue.indexOf(option.value);
    if (indexValue === -1) {
      recurrenciaControl.setValue([...recurrenciaValue, option.value]);
    } else {
      recurrenciaControl.setValue(
        recurrenciaValue.filter((value) => value !== option.value)
      );
    }
  }

  isOptionSelected = (
    option: { label: string; value: string },
    index: number
  ) => {
    const detalleArray = this.eventForm.get('detalle') as FormArray;
    const recurrenciaValue = detalleArray.at(index)?.get('recurrencia')
      ?.value as string[];
    return recurrenciaValue?.includes(option.value);
  };

  onStartTimeChange(event: any, index: number): void {
    const [hours, minutes] = event.dateString.split(':').map(Number);
    const minEndDate = new Date();
    minEndDate.setHours(hours, minutes + 5);
    const horaFinControl = this.detalle
      .at(index)
      ?.get('hora_fin') as FormControl;
    horaFinControl.setValue(minEndDate.toTimeString().slice(0, 5));
  }

  createDetalle() {
    return this.fb.group({
      id_terapia: [null, Validators.required],
      id_paquete: [null],
      fecha_inicio: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
      num_sesiones: [null],
      id_personal: [null, Validators.required],
      recurrencia: this.fb.control([]),
    });
  }

  addInfoTerapia() {
    this.detalle.push(this.createDetalle());
  }

  removeInfoTerapia(i: number) {
    this.detalle.removeAt(i);
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
    this.citaService.create(this.eventForm.value).subscribe((resp) => {
      console.log(resp);
      this.eventSubmitted.emit(this.eventForm.value);
    });
    console.log(this.eventForm.value);
  }

  // updateEvent() {
  //   if (this.editEventForm.invalid) {
  //     alert('Por favor, complete todos los campos requeridos.');
  //     return;
  //   }

  //   const startDateTime = this.combineDateTime(
  //     this.editEventForm.value.startDate,
  //     this.editEventForm.value.startTime
  //   );

  //   const endDateTime = this.combineDateTime(
  //     this.editEventForm.value.endDate || this.editEventForm.value.startDate,
  //     this.editEventForm.value.endTime || this.editEventForm.value.startTime
  //   );

  //   const eventToUpdate: CalendarEvent = {
  //     id: this.event!.id,
  //     title: this.editEventForm.value.therapyType,
  //     start: startDateTime,
  //     end: endDateTime,
  //     description: this.editEventForm.value.eventDescription,
  //     therapyType: this.editEventForm.value.therapyType,
  //     doctor: this.editEventForm.value.doctor, // Añadir el doctor
  //     selectedPatient: this.editEventForm.value.selectedPatient,
  //   };

  //   console.log('Event to update:', eventToUpdate);

  //   this.eventSubmitted.emit(eventToUpdate);
  //   this.activeModal.close();
  // }

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
