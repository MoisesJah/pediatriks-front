import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FlatpickrDefaultsInterface, FlatpickrModule } from 'angularx-flatpickr';
import { map, Observable } from 'rxjs';
import { IPaciente } from 'src/app/models/paciente';
import { Personal } from 'src/app/models/personal';
import { TipoCita } from 'src/app/models/tipocita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { TipocitaService } from 'src/app/services/tipocita/tipocita.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [ReactiveFormsModule,FlatpickrModule,NgSelectModule,CommonModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent {
  personalService = inject(PersonalService);
  pacienteService = inject(PacienteService);
  tipoCitaService = inject(TipocitaService);
  terapiaService = inject(TerapiaService);
  paquetesService = inject(PaqueteService);
  isLoading = inject(LoadingService).isLoading;
  citaService = inject(CitaService);

  @Output() onSaveComplete = new EventEmitter();

  modal = inject(NgbModal);
  personal: Personal | null = null;
  isCitaContinua = false;

  pacientesList: Observable<IPaciente[]> = new Observable();
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

  changePaquete(event: any) {
    const sesionesControl = this.createForm.get('num_sesiones') as FormControl;
    sesionesControl.setValue(event?.cantidadsesiones);
  }

  changeTipoCita(event: any) {
    // console.log(event);
    this.isCitaContinua = event && event?.nombre !== 'Evaluación';
  }

  closeModal() {
    this.modal.dismissAll();
  }

  loadTipoCitas() {
    this.tipoCitasList = this.tipoCitaService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadPaquetes() {
    this.paquetesList = this.terapiaService
      .getPaquetesByTerapia(this.personal?.id_terapia!)
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

  createCita(){}
}
