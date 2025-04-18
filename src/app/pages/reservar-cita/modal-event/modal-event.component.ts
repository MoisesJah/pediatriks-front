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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalEditComponent } from './modal-edit/modal-edit.component'; // Asegúrate de importar el componente de edición
import { distinctUntilChanged, finalize, map, Observable, take } from 'rxjs';
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
import { Paquete } from 'src/app/models/paquetes';
import { CitaService } from 'src/app/services/citas/cita.service';
import { FlatpickrDefaultsInterface, FlatpickrModule } from 'angularx-flatpickr';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { el } from '@fullcalendar/core/internal-common';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-modal-event',
  standalone: true,
  imports: [FlatpickrModule, CommonModule, ReactiveFormsModule, NgSelectModule],
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

  loadingPacientes = false;
  loadingSedes = false;
  loadingPersonal = false;
  loadingTerapias = false;
  loadingTipoCitas = false;
  loadingPaquetes = false;

  selectedPaquete: Paquete | null = null;

  eventForm: FormGroup;
  minDate: string;

  startDate!: string;
  startTime!: string;
  endTime!: string;

  es = Spanish.es;

  isRecurrente = false;
  terapiasId: string[] = [];
  paquetesId: any[] = [];

  avaiblePersonal: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    const today = new Date();
    this.minDate = this.formatDate(today);

    this.eventForm = this.fb.group({
      id_paciente: [null, Validators.required],
      id_paquete: [null],
      id_sede: [null, Validators.required],
      fecha_inicio: ['', Validators.required],
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
    this.isRecurrente = event && event.recurrente;
    if (this.isRecurrente) {
      this.loadPaquetes()
    }
  }

  changePaquete(event: any, index: number) {
    this.selectedPaquete = event;
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
  }

  getTerapiaId(event: any, index: number) {
    if (this.isRecurrente && event) {
      this.terapiasId[index] = event.id_terapia;
      this.terapiaService
        .getPaquetesByTerapia(event.id_terapia)
        .pipe(take(1))
        .subscribe((resp) => (this.paquetesId[index] = resp.data));
    } else {
      this.paquetesId[index] = [];
      this.detalle.at(index).get('id_personal')?.setValue(null);
      this.detalle.at(index).get('id_paquete')?.setValue(null);
    }
  }

  ngAfterViewInit() {
    this.eventForm.valueChanges
      .pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((value) => {
        const id_sede = value.id_sede;
        const detalle = value.detalle;

        detalle.forEach((control: any, index: number, array: any) => {
          const body = {
            id_terapia: array[index].id_terapia,
            fecha_inicio: array[index].fecha_inicio,
            hora_inicio: array[index].hora_inicio,
            hora_fin: array[index].hora_fin,
            id_sede,
          };

          const requiredFields = [
            body.id_terapia,
            body.fecha_inicio,
            body.hora_inicio,
            body.hora_fin,
          ];

          if (requiredFields.every(Boolean) && id_sede) {
            this.citaService
              .getAvailablePersonal(body)
              .pipe(take(1))
              .subscribe({
                next: (resp: any) => {
                  this.avaiblePersonal[index] = resp.data;
                },
                error: () => {
                  this.avaiblePersonal[index] = [];
                }
              });
          } else {
            this.avaiblePersonal[index] = [];
            this.detalle.at(index).get('id_personal')?.setValue(null);
          }
        });
      });
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
    this.loadingTipoCitas = true;
    this.tipoCitasList = this.tipoCitaService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this),
      finalize(() => (this.loadingTipoCitas = false))
    );
  }

  loadPacientes() {
    this.loadingPacientes = true;
    this.pacientesList = this.pacienteService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this),
      finalize(() => (this.loadingPacientes = false))
    );
  }

  loadPaquetes() {
    this.loadingPaquetes = true;
    this.paquetesList = this.paquetesService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this),
      finalize(() => (this.loadingPaquetes = false))
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
    console.log(this.eventForm.value);
    // this.citaService.create(this.eventForm.value).subscribe((resp) => {
    //   this.eventSubmitted.emit();
    //   this.closeModal();
    // });
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
}
