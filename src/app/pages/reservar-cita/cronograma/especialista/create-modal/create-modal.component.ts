import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
import { finalize, map, Observable } from 'rxjs';
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

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FlatpickrModule,
    NgSelectModule,
    CommonModule,
    NgbTooltipModule,
  ],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss',
})
export class CreateModalComponent implements OnInit {
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

  loadingPacientes = false;
  loadingPaquetes = false;
  loadingTipoCitas = false;

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

  ngOnInit(): void {
    this.loadPacientes();
    this.loadTipoCitas();
    this.loadPaquetes();
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
    const hora_inicio = this.createForm.get('hora_inicio')?.value;
    const hora_fin = this.createForm.get('hora_fin')?.value;

    const horarios = this.personal?.horarios as any[];

    return horarios.some(
      (horario) =>
        horario.startTime.substring(0, 5) <= hora_inicio &&
        horario.endTime.substring(0, 5) >= hora_fin &&
        horario.daysOfWeek.includes(option.value)
    );
  };

  toggleOption(option: { label: string; value: number }) {
    const fecha_inicio = this.createForm.get('fecha_inicio')?.value;

    const recurrenciaControl = this.createForm.get('recurrencia') as FormArray;
    const dayOfWeek = new Date(fecha_inicio).getDay() + 1;

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

    if (!recurrenciaControl.value.includes(dayOfWeek)) {
      // console.log(dayOfWeek);
      recurrenciaControl.push(this.fb.control(dayOfWeek));
    }

    if (option.value === dayOfWeek) return true;

    return (
      recurrenciaControl.value.includes(option.value) &&
      this.isEnabledDay(option)
    );
  };

  changePaquete(event: any) {
    const paquetesControl = this.createForm.get('id_paquete') as FormControl;
    const sesionesControl = this.createForm.get('num_sesiones') as FormControl;
    this.maxSesiones = event?.cantidadsesiones;

    if (paquetesControl.value) {
      sesionesControl.setValidators(Validators.required);
    }
    sesionesControl.setValue(null);
    sesionesControl.updateValueAndValidity();
  }

  changeTipoCita(event: any) {
    this.isRecurrente = event?.recurrente;
    this.isCitaPaquete = event?.nombre === 'Paquete';

    const id_paquete = this.createForm.get('id_paquete');
    const num_sesiones = this.createForm.get('num_sesiones');
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

  closeModal() {
    this.modal.dismissAll();
  }

  loadTipoCitas() {
    this.loadingTipoCitas = true;
    this.tipoCitasList = this.tipoCitaService.getAll().pipe(
      map((resp) => resp.data),
      finalize(() => (this.loadingTipoCitas = false)),
      untilDestroyed(this)
    );
  }

  loadPaquetes() {
    this.loadingPaquetes = true;
    this.paquetesList = this.terapiaService
      .getPaquetesByTerapia(this.personal?.terapia.id_terapia!)
      .pipe(
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
    if (this.createForm.valid) {
      this.citaService
        .createForTherapy({
          ...this.createForm.value,
          id_sede: this.personal?.sede.id_sede,
          id_terapia: this.personal?.terapia.id_terapia,
          id_personal: this.personal?.id_personal,
        })
        .subscribe({
          next: () => {
            this.onSaveComplete.emit();
            this.closeModal();
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
