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
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  FlatpickrDefaultsInterface,
  FlatpickrModule,
} from 'angularx-flatpickr';
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  Observable,
} from 'rxjs';
import { IPaciente } from 'src/app/models/paciente';
import { Personal } from 'src/app/models/personal';
import { Sede } from 'src/app/models/sede';
import { Terapia } from 'src/app/models/terapia';
import { TipoCita } from 'src/app/models/tipocita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { TipocitaService } from 'src/app/services/tipocita/tipocita.service';
import Spanish from 'flatpickr/dist/l10n/es.js';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-crear-modal',
  standalone: true,
  imports: [NgSelectModule, NgbTooltipModule, CommonModule, ReactiveFormsModule, FlatpickrModule],
  templateUrl: './crear-modal.component.html',
  styleUrl: './crear-modal.component.scss',
})
export class CrearModalComponent implements OnInit, AfterViewInit {
  modal = inject(NgbModal);
  sedesService = inject(SedesService);
  personalService = inject(PersonalService);
  pacienteService = inject(PacienteService);
  tipoCitaService = inject(TipocitaService);
  terapiaService = inject(TerapiaService);
  paquetesService = inject(PaqueteService);
  isLoading = inject(LoadingService).isLoading;
  citaService = inject(CitaService);

  @Output() eventSubmitted = new EventEmitter();
  @Output() eventDeleted = new EventEmitter<string>();

  id_terapia!: string;
  terapia!: Terapia;
  es = Spanish.es;
  isCitaContinua = false;
  isCitaPaquete = false;

  sedesList: Observable<Sede[]> = new Observable();
  pacientesList: Observable<IPaciente[]> = new Observable();
  personalList = [];
  tipoCitasList: Observable<TipoCita[]> = new Observable();
  paquetesList: Observable<any> = new Observable();

  createForm: FormGroup;

  timeOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    // will be used since specific attribute is not provided
  };

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      id_sede: [null, Validators.required],
      id_paciente: [null, Validators.required],
      // id_terapia: [null, Validators.required],
      id_personal: [null, Validators.required],
      id_tipocita: [null, Validators.required],
      id_paquete: [null],
      fecha_inicio: [null, Validators.required],
      hora_inicio: [null, Validators.required],
      hora_fin: [null, Validators.required],
      descripcion: [null],
      paquete: [null],
      num_sesiones: [null],
      recurrencia: this.fb.array([]),
    });
  }

  options = [
    { label: 'L', value: 1 },
    { label: 'M', value: 2 },
    { label: 'MI', value: 3 },
    { label: 'J', value: 4 },
    { label: 'V', value: 5 },
    { label: 'S', value: 6 },
  ];

  isEnabledDay = (option: { label: string; value: number }) => {
    const id_personal = this.createForm.get('id_personal')?.value;
    const hora_inicio = this.createForm.get('hora_inicio')?.value;
    const hora_fin = this.createForm.get('hora_fin')?.value;

    return this.personalList.some((personal: Personal) =>
      personal.horarios?.some(
        (horario) =>
          horario.hora_inicio.substring(0, 5) <= hora_inicio &&
          horario.hora_fin.substring(0, 5) >= hora_fin &&
          horario.dia_semana === option.value &&
          personal.id_personal === id_personal
      )
    );
  };

  onChangeSede(event: any) {
    this.createForm.get('id_personal')?.setValue(null);
  }
    

  onStartTimeChange(event: any): void {
    const [hours, minutes] = event.dateString.split(':').map(Number);
    const minEndDate = new Date();
    minEndDate.setHours(hours, minutes + 5);
    const horaFinControl = this.createForm.get('hora_fin') as FormControl;
    horaFinControl.setValue(minEndDate.toTimeString().slice(0, 5));
  }

  changePaquete(event: any) {
    const sesionesControl = this.createForm.get('num_sesiones') as FormControl;
    sesionesControl.setValue(event?.cantidadsesiones);
  }

  toggleOption(option: { label: string; value: number }) {
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;

    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;

    if (!recurrenciaControl.value.includes(dayOfWeek)) {
      recurrenciaControl.push(this.fb.control(dayOfWeek));
    }

    if (option.value === dayOfWeek) return;


    if (recurrenciaControl.value.includes(option.value)) {
      recurrenciaControl.removeAt(
        recurrenciaControl.value.indexOf(option.value)
      );
    } else {
      recurrenciaControl.push(this.fb.control(option.value));
    }
  }

  isOptionSelected = (option: { label: string; value: number }) => {
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;
    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;

    if (option.value === dayOfWeek) return true;

    return recurrenciaControl.value.includes(option.value) && this.isEnabledDay(option);
  };

  closeModal() {
    this.modal.dismissAll();
  }

  changeTipoCita(event: any) {
    // console.log(event);
    this.isCitaContinua = event && event?.nombre !== 'Evaluación';
    this.isCitaPaquete = event && event?.nombre === 'Paquete';
  }

  ngOnInit(): void {
    this.loadSedes();
    this.loadPacientes();
    this.loadTipoCitas();
    this.loadPaquetes();
  }

  ngAfterViewInit(): void {
    this.createForm.valueChanges
      .pipe(distinctUntilKeyChanged('id_sede'))
      .subscribe((value) => {
        const { id_sede, fecha_inicio, hora_inicio, hora_fin, id_personal } = value;
        const requiredFields = [id_sede, fecha_inicio, hora_inicio, hora_fin];

        const body = {
          id_sede,
          fecha_inicio,
          hora_inicio,
          hora_fin,
          id_terapia: this.terapia.id_terapia,
        };

        if (requiredFields.every(Boolean)) {
          this.citaService
            .getAvailablePersonal(body)
            .pipe(debounceTime(500))
            .subscribe((resp: any) => {
              this.personalList = resp.data;
            });
        } else {
          this.personalList = [];
          this.createForm.get('id_personal')?.setValue(null);
        }
      });
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

  loadPaquetes() {
    this.paquetesList = this.terapiaService
      .getPaquetesByTerapia(this.terapia.id_terapia)
      .pipe(
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

  createCita() {
    this.citaService
      .createForTherapy({
        ...this.createForm.value,
        id_terapia: this.terapia.id_terapia,
      })
      .subscribe((resp) => {
        this.eventSubmitted.emit(resp.data);
        this.modal.dismissAll();
      });
  }
}
