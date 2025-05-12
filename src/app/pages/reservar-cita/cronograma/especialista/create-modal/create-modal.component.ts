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
import {
  NgbModal,
  NgbPopover,
  NgbPopoverModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  FlatpickrDefaultsInterface,
  FlatpickrModule,
} from 'angularx-flatpickr';
import { distinctUntilChanged, finalize, map, Observable } from 'rxjs';
import { IPaciente } from 'src/app/models/paciente';
import { Personal } from 'src/app/models/personal';
import { TipoCita } from 'src/app/models/tipocita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { TipocitaService } from 'src/app/services/tipocita/tipocita.service';
import { CurrentPersonal } from '../especialista.component';
import { ToastrService } from 'ngx-toastr';
import {
  generateTimeSlots,
  generateTimeSlotsEsp,
} from 'src/app/utils/slotTimes';
import { SlotTimePickerComponent } from '../../modals/crear-modal/slot-time-picker/slot-time-picker.component';
import { slots } from '../../modals/crear-modal/crear-modal.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FlatpickrModule,
    NgSelectModule,
    CommonModule,
    SlotTimePickerComponent,
    NgbPopoverModule,
    NgbTooltipModule,
  ],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
})
export class CreateModalComponent implements OnInit, AfterViewInit {
  personalService = inject(PersonalService);
  pacienteService = inject(PacienteService);
  tipoCitaService = inject(TipocitaService);
  terapiaService = inject(TerapiaService);
  paquetesService = inject(PaqueteService);
  isLoading = inject(LoadingService).isLoading;
  citaService = inject(CitaService);
  toast = inject(ToastrService);

  @Output() onSaveComplete = new EventEmitter();

  modal = inject(NgbModal);
  personal: CurrentPersonal | null = null;
  isCitaContinua = false;

  pacientesList: Observable<IPaciente[]> = new Observable();
  tipoCitasList: Observable<TipoCita[]> = new Observable();
  paquetesList: Observable<any> = new Observable();
  createForm: FormGroup;
  maxSesiones = 0;
  isRecurrente = false;
  isCitaPaquete = false;
  id_tipopaquete = '';
  num_cambios = 0;

  loadingPacientes = false;
  loadingPaquetes = false;
  loadingTipoCitas = false;
  loadingHorarios = false;
  slotTimeList: slots[] = [];

  timeOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    // will be used since specific attribute is not provided
  };

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      // id_sede: [null],
      id_paciente: [null, Validators.required],
      // id_terapia: [null, Validators.required],
      // id_personal: [null],
      id_tipocita: [null, Validators.required],
      // id_paquete: [null],
      id_paciente_paquete: [null],
      fecha_inicio: [null, Validators.required],
      hora_inicio: [null, Validators.required],
      hora_fin: [null, Validators.required],
      paquete: [null],
      num_sesiones: [null],
      recurrencia: this.fb.array(
        this.options.map((option) => this.createDayGroup(option.value))
      ),
    });
  }

  createDayGroup(diaSemana: number): FormGroup {
    return this.fb.group({
      dia_semana: [diaSemana],
      selectedTimeSlot: [null], // FormControl for the selected time slot
    });
  }

  diferentSlots() {
    const dayOfWeeks =
      new Date(this.createForm.get('fecha_inicio')?.value).getDay() + 1;
    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;

    return recurrenciaControl.value.some(
      (dayGroup: any) =>
        dayGroup.dia_semana !== dayOfWeeks && dayGroup.selectedTimeSlot !== null
    );
  }

  get days(): FormArray {
    return this.createForm.get('recurrencia') as FormArray;
  }

  getDayLabel(diaSemana: number): string {
    const option = this.options.find((o) => o.value === diaSemana);
    return option!.label || '';
  }

  // Handle time slot selection
  onSlotSelected(index: number, timeSlot: string): void {
    const dayGroup = this.days.at(index) as FormGroup;
    if (dayGroup.get('selectedTimeSlot')?.value === timeSlot) {
      dayGroup.patchValue({ selectedTimeSlot: null });
      return;
    }
    dayGroup.patchValue({ selectedTimeSlot: timeSlot });
  }

  onDeselect(popover: NgbPopover, index: number) {
    // const dayGroup = this.days.at(index) as FormGroup;
    // dayGroup.patchValue({ selectedTimeSlot: null });
    popover.close();
  }

  ngOnInit(): void {
    this.loadPacientes();
    this.loadTipoCitas();
    this.getTimeAvailables();
  }

  options = [
    { label: 'L', value: 1 },
    { label: 'M', value: 2 },
    { label: 'MI', value: 3 },
    { label: 'J', value: 4 },
    { label: 'V', value: 5 },
    { label: 'S', value: 6 },
  ];

  isEnabledDay = (value: number) => {
    const horarios = this.personal?.horarios as any[];

    return horarios.some((horario) =>
      // horario.dia_semana === value
      horario.daysOfWeek.includes(value)
    );
  };

  changePaquete(event: any) {
    const paquetesControl = this.createForm.get(
      'id_paciente_paquete'
    ) as FormControl;
    const sesionesControl = this.createForm.get('num_sesiones') as FormControl;
    this.maxSesiones = event?.sesiones_totales - event?.sesiones_programadas;
    this.num_cambios = event?.num_cambios;

    if (paquetesControl.value) {
      sesionesControl.setValue(this.maxSesiones);
      sesionesControl.setValidators([
        Validators.required,
        Validators.max(this.maxSesiones),
      ]);
    } else {
      sesionesControl.setValue(null);
    }
    sesionesControl.updateValueAndValidity();
  }

  changeTipoCita(event: any) {
    this.isRecurrente = event?.recurrente;
    this.isCitaPaquete = event?.nombre === 'Paquete';
    this.id_tipopaquete = this.isCitaPaquete && event?.id_tipocita;

    const id_paquete = this.createForm.get('id_paquete');
    const num_sesiones = this.createForm.get('num_sesiones');

    if (!this.isRecurrente) {
      this.days.value.forEach((day: any) => {
        day.selectedTimeSlot = null;
      });
    }

    if (this.isCitaPaquete) {
      id_paquete?.setValidators(Validators.required);
    } else {
      id_paquete?.clearValidators();
      id_paquete?.setValue(null);
      num_sesiones?.setValue(null);
      num_sesiones?.clearValidators();
    }
    id_paquete?.updateValueAndValidity();
    num_sesiones?.updateValueAndValidity();
  }

  changePaciente(event: any) {
    const id_paquete = this.createForm.get('id_paquete');
    if (id_paquete) {
      id_paquete.setValue(null);
      id_paquete.clearValidators();
    }
  }

  closeModal() {
    this.modal.dismissAll();
  }

  getTimeAvailables() {
    this.loadingHorarios = true;
    this.personalService
      .getHorariosLibre({
        fecha_inicio: this.createForm.get('fecha_inicio')?.value,
        id_personal: this.personal?.id_personal,
      })
      .pipe(
        finalize(() => (this.loadingHorarios = false)),
        untilDestroyed(this)
      )
      .subscribe((resp: any) => {
        this.slotTimeList = resp.data;
      });
  }

  loadPaquetesPaciente() {
    this.createForm.valueChanges
      .pipe(
        distinctUntilChanged(
          (x, y) =>
            x.id_paciente === y.id_paciente &&
            y.id_tipocita === this.id_tipopaquete
        )
      )
      .subscribe((value) => {
        const { id_paciente } = value;

        if (id_paciente) {
          this.loadPaquetes(id_paciente);
        }
      });
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
      id_terapia: this.personal?.terapia.id_terapia,
    };
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

  getTimeSlots(diaSemana: number) {
    const day = this.slotTimeList?.find((d) => +d.day_of_week === diaSemana);
    return day ? day.available_slots : [];
  }

  toggleOption(value: number): void {
    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;

    const selectedTimeSlot = `${this.createForm.get('hora_inicio')?.value} - ${
      this.createForm.get('hora_fin')?.value
    }`;

    if (value === dayOfWeek) {
      recurrenciaControl.controls
        .find((c) => c.value.dia_semana === value)
        ?.setValue({ dia_semana: value, selectedTimeSlot });
    } else {
      const index = recurrenciaControl.value.indexOf(value);
      index !== -1
        ? recurrenciaControl.removeAt(index)
        : recurrenciaControl.push(this.fb.control({ dia_semana: value }));
    }
  }

  isCurrentDayOfWeek(value: number) {
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;

    if (value === dayOfWeek) return true;

    return false;
  }

  isOptionSelected = (value: number) => {
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;
    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;

    const selectedTimeSlot = {
      start_time: this.createForm.get('hora_inicio')?.value,
      end_time: this.createForm.get('hora_fin')?.value,
    };

    if (value === dayOfWeek) {
      recurrenciaControl.controls
        .find((c) => c.value.dia_semana === value)
        ?.setValue({ dia_semana: value, selectedTimeSlot });
      return true;
    }

    return (
      recurrenciaControl.controls.find(
        (f) => f.value.dia_semana === value && f.value.selectedTimeSlot
      ) && this.isEnabledDay(value)
    );
  };

  ngAfterViewInit(): void {
    this.loadPaquetesPaciente();
    this.slotTimeList = generateTimeSlotsEsp(
      this.personal?.horarios as any,
      this.personal?.terapia.duracion!
    );
    this.createForm.valueChanges.subscribe((value) => {
      console.log(this.createForm.errors);
    });
  }

  createCita() {
    if (this.createForm.valid) {
      this.citaService
        .createForTherapy({
          ...this.createForm.value,
          num_cambios: this.num_cambios || 2,
          id_sede: this.personal?.sede.id_sede,
          id_terapia: this.personal?.terapia.id_terapia,
          id_personal: this.personal?.id_personal,
          recurrencia: this.days.value.filter(
            (day: any) => day.selectedTimeSlot
          ),
        })
        .subscribe({
          next: (resp: any) => {
            if (resp.status === 'success') {
              this.toast.success(resp.message, 'Cita creada');
            } else {
              this.toast.info(resp.message, 'Cita creada', {
                disableTimeOut: true,
                closeButton: true,
              });
            }
            this.onSaveComplete.emit();
            this.closeModal();
          },
          error: (err) => {
            if (err.error.errors) {
              const errors = Object.values(err.error.errors).join('\n');
              this.toast.error(errors, 'Error');
            } else {
              this.toast.error(err.error.message, 'Error al crear la cita');
            }
          },
        });
    }
  }
}
