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
import { NgbModal, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
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
  filter,
  finalize,
  interval,
  map,
  Observable,
  tap,
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
import { ToastrService } from 'ngx-toastr';
import { SlotTimePickerComponent } from './slot-time-picker/slot-time-picker.component';
import { generateTimeSlots } from 'src/app/utils/slotTimes';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-crear-modal',
  standalone: true,
  imports: [
    NgSelectModule,
    NgbTooltipModule,
    CommonModule,
    ReactiveFormsModule,
    FlatpickrModule,
    SlotTimePickerComponent,
    NgbPopoverModule
  ],
  templateUrl: './crear-modal.component.html',
  styleUrl: './crear-modal.component.scss',
})
export class CrearModalComponent implements OnInit, AfterViewInit {
  modal = inject(NgbModal);
  toast = inject(ToastrService);
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
  maxSesiones = 0;
  es = Spanish.es;
  isRecurrente = false;
  isCitaPaquete = false;
  sedeComas = ''
  num_cambios = 0;
  id_tipopaquete = '';

  sedesList: Observable<Sede[]> = new Observable();
  pacientesList: Observable<IPaciente[]> = new Observable();
  personalList = [];
  tipoCitasList: Observable<TipoCita[]> = new Observable();
  paquetesList: Observable<any> = new Observable();

  loadingPacientes = false;
  loadingSedes = false;
  loadingPaquetes = false;
  loadingTipoCitas = false;

  activePersonal: Personal | null = null
  slotTimeList: ReturnType<typeof generateTimeSlots> = []

  createForm: FormGroup;

  timeOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    // will be used since specific attribute is not provided
  };

  options = [
    { label: 'L', value: 1 },
    { label: 'M', value: 2 },
    { label: 'MI', value: 3 },
    { label: 'J', value: 4 },
    { label: 'V', value: 5 },
    { label: 'S', value: 6 },
  ];

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
      recurrencia: this.fb.array(this.options.map((option) => this.createDayGroup(option.value))),
    });
  }

  createDayGroup(diaSemana: number): FormGroup {
    return this.fb.group({
      dia_semana: [diaSemana],
      selectedTimeSlot: [null], // FormControl for the selected time slot
    });
  }

  diferentSlots() {
    const dayOfWeeks = new Date(this.createForm.get('fecha_inicio')?.value).getDay() + 1;
    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;

    return recurrenciaControl.value.some((dayGroup: any) => dayGroup.dia_semana !== dayOfWeeks && dayGroup.selectedTimeSlot !== null);
  }

  get days(): FormArray {
    return this.createForm.get('recurrencia') as FormArray;
  }

  jun(){
    console.log(this.days.controls)
    
    console.log(this.options.map((option) => this.createDayGroup(option.value)))
  }

  getDayLabel(diaSemana: number): string {
    console.log(this.options)
    console.log(diaSemana)
    const option = this.options.find((o) => o.value === diaSemana);
    return option!.label || ''
  }

  // Handle time slot selection
  onSlotSelected(index: number, timeSlot: string): void {
    const dayGroup = this.days.at(index) as FormGroup;
    dayGroup.patchValue({ selectedTimeSlot: timeSlot });
  }

  onDeselect(index: number) {
    const dayGroup = this.days.at(index) as FormGroup;
    dayGroup.patchValue({ selectedTimeSlot: null });
  }

  isEnabledDay = (value:number) => {
    const id_personal = this.createForm.get('id_personal')?.value;

    return this.personalList.some((personal: Personal) =>
      personal.horarios?.some(
        (horario) =>
          horario.dia_semana === value &&
          personal.id_personal === id_personal
      )
    );
  };

  onChangeSede(event: any) {
    this.createForm.get('id_personal')?.setValue(null);

    if(event && event.nombre === 'Sede Comas'){
      this.sedeComas = event.id_sede
    }
  }

  changePersonal(event:any){
    this.activePersonal = event

    if(this.activePersonal){
      this.slotTimeList = generateTimeSlots(this.activePersonal.horarios, this.activePersonal.terapia.duracion)
    }
  }

  getTimeSlots(diaSemana: number): string[] {
    const day = this.slotTimeList?.find((d) => d.dia_semana === diaSemana);
    return day ? day.time_slots : [];
  }

  changePaquete(event: any) {
    const paquetesControl = this.createForm.get('id_paquete') as FormControl;
    const sesionesControl = this.createForm.get('num_sesiones') as FormControl;
    this.maxSesiones = event?.num_sesiones;
    this.num_cambios = event?.num_cambios;
    
    if (paquetesControl.value) {
      sesionesControl.setValue(event.num_sesiones);
      sesionesControl.setValidators([
        Validators.required,
        Validators.max(event.num_sesiones),
      ]);
    }else{
      sesionesControl.setValue(null);
    }
    sesionesControl.updateValueAndValidity();
  }

  // changePaquete(event: any) {
  //   const paqueteControl = this.createForm.get('id_paquete') as FormControl;
  //   const sesionesControl = this.createForm.get('num_sesiones') as FormControl;

  //   if (paqueteControl.value) {
  //     sesionesControl.setValue(event.cantidadsesiones);
  //   }
  // }

  toggleOption(value: number): void {
    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;

    const selectedTimeSlot = `${this.createForm.get('hora_inicio')?.value} - ${this.createForm.get('hora_fin')?.value}`
  
    if (value === dayOfWeek) {
      recurrenciaControl.controls.find((c) => c.value.dia_semana === value)?.setValue({ dia_semana: value, selectedTimeSlot });
    } else {
      const index = recurrenciaControl.value.indexOf(value);
      index !== -1 ? recurrenciaControl.removeAt(index) : recurrenciaControl.push(this.fb.control({ dia_semana: value }));
    }
  }

  isCurrentDayOfWeek(value:number){
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;

    if(value === dayOfWeek) return true

    return false
  }

  isOptionSelected = (value:number) => {
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;
    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;

    const selectedTimeSlot = `${this.createForm.get('hora_inicio')?.value} - ${this.createForm.get('hora_fin')?.value}`

    if (value === dayOfWeek) {
      recurrenciaControl.controls.find((c) => c.value.dia_semana === value)?.setValue({ dia_semana: value, selectedTimeSlot });
      return true;
    }

    return (
      recurrenciaControl.controls.find(f=>f.value.dia_semana === value && f.value.selectedTimeSlot) &&
      this.isEnabledDay(value)
    );
  };

  closeModal() {
    this.modal.dismissAll();
  }

  // changeTipoCita(event: any) {
  //   this.isRecurrente = event?.recurrente;
  //   this.isCitaPaquete = event?.nombre === 'Paquete';

  //   const id_paquete = this.createForm.get('id_paquete');
  //   const num_sesiones = this.createForm.get('num_sesiones');
  //   if (this.isCitaPaquete) {
  //     id_paquete?.setValidators(Validators.required);
  //   } else {
  //     id_paquete?.clearValidators();
  //     id_paquete?.setValue(null);
  //     num_sesiones?.setValue(null);
  //     num_sesiones?.clearValidators();
  //   }
  //   id_paquete?.updateValueAndValidity();
  //   num_sesiones?.updateValueAndValidity();
  // }

  changeTipoCita(event: any) {
    const isContinua = event?.nombre === 'Continua'

    this.isRecurrente = event?.recurrente;
    this.isCitaPaquete = event?.nombre === 'Paquete';

    this.id_tipopaquete = this.isCitaPaquete && event?.id_tipocita;

    if(!this.isRecurrente) this.days.reset();

    const id_paquete = this.createForm.get('id_paquete');
    const num_sesiones = this.createForm.get('num_sesiones');
    const id_sede = this.createForm.get('id_sede');

    if (this.isCitaPaquete) {
      id_paquete?.setValidators(Validators.required);
      id_sede?.setValue(this.sedeComas);
    } else {
      id_paquete?.clearValidators();
      id_paquete?.setValue(null);
      id_sede?.setValue(null);
      num_sesiones?.setValue(null);
      num_sesiones?.clearValidators();
    }
    id_sede?.updateValueAndValidity();
    id_paquete?.updateValueAndValidity();
    num_sesiones?.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.loadSedes();
    this.loadPacientes();
    this.loadTipoCitas();
  }

  changePaciente(event: any) {
    const id_paquete = this.createForm.get('id_paquete');
    if(id_paquete){
      id_paquete.setValue(null);
      id_paquete.clearValidators();
    }
  }

  loadPaquetesPaciente() {
    this.createForm.valueChanges
      .pipe(
        distinctUntilChanged(
          (x, y) => x.id_paciente === y.id_paciente && y.id_tipocita === this.id_tipopaquete
        )
      )
      .subscribe((value) => {
        const { id_paciente } = value;

        if (id_paciente) {
          this.loadPaquetes(id_paciente);
        }
      });
  }

  ngAfterViewInit(): void {
    this.loadPaquetesPaciente();
    this.createForm.valueChanges
      .pipe(distinctUntilKeyChanged('id_sede'))
      .subscribe((value) => {
        const { id_sede, fecha_inicio, hora_inicio, hora_fin, id_personal } =
          value;
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
    this.loadingSedes = true;
    this.sedesList = this.sedesService.getAll().pipe(
      map((resp) => resp.data),
      tap((resp) => (this.sedeComas = resp.filter((sede) => sede.nombre === 'Sede Comas')[0].id_sede)),
      finalize(() => (this.loadingSedes = false)),
      untilDestroyed(this)
    );
  }

  loadTipoCitas() {
    this.loadingTipoCitas = true;
    this.tipoCitasList = this.tipoCitaService.getAll().pipe(
      map((resp) => resp.data),
      finalize(() => (this.loadingTipoCitas = false)),
      untilDestroyed(this)
    );
  }

  loadPaquetes(id_paciente: string) {
    this.loadingPaquetes = true;
    const body = {
      id_paciente,
      id_terapia: this.terapia.id_terapia,
    }
    this.paquetesList = this.paquetesService.getByPaciente(body).pipe(
      map((resp) => resp.data),
      finalize(() => (this.loadingPaquetes = false)),
      untilDestroyed(this)
    );
  }

  loadPacientes() {
    this.loadingPacientes = true;
    this.pacientesList = this.pacienteService.getAll().pipe(
      map((resp) => resp.data),
      finalize(() => (this.loadingPacientes = false)),
      untilDestroyed(this)
    );
  }

  createCita() {
    console.log(this.createForm.value);
    if (this.createForm.valid) {
      this.citaService
        .createForTherapy({
          ...this.createForm.value,
          num_cambios: this.num_cambios || 2,
          id_terapia: this.terapia.id_terapia,
          recurrencia: this.days.value.filter((day: any) => day.selectedTimeSlot),
        })
        .subscribe({
          next: (data: any) => {
            this.eventSubmitted.emit();
            this.closeModal();
            if (!data.message.startsWith('Cita')) {
              this.toast.info(data.message, 'Cita Creada', {
                disableTimeOut: true,
                closeButton: true,
                // progressBar: true,
                // progressAnimation: 'increasing',
              });
            }
          },
          error: (err) => {
            if (err.error.errors) {
              const errors = Object.values(err.error.errors).join('\n');
              this.toast.error(errors, 'Error');
            } else {
              this.toast.error('Ocurrió un error al crear la cita', 'Error');
            }
          },
        });
    }
  }
}
