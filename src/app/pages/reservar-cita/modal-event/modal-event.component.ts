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
import {
  NgbActiveModal,
  NgbModal,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'src/app/models/calendar-event';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ModalEditComponent } from './modal-edit/modal-edit.component'; // Asegúrate de importar el componente de edición
import {
  BehaviorSubject,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  Subject,
  switchMap,
  take,
} from 'rxjs';
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
import {
  FlatpickrDefaultsInterface,
  FlatpickrModule,
} from 'angularx-flatpickr';
import Spanish from 'flatpickr/dist/l10n/es.js';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListHorariosComponent } from './list-horarios/list-horarios.component';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-modal-event',
  standalone: true,
  imports: [
    FlatpickrModule,
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
  ],
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
  toast = inject(ToastrService);

  @ViewChild('startTimePicker') startTimePicker!: ElementRef;

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

  selectedPackageSubject = new BehaviorSubject<string | null>(null);

  terapiasListItems: {
    observable: Observable<Terapia[]>;
    loading: BehaviorSubject<boolean>;
  }[] = [];

  selectedPaquete: Paquete | null = null;

  eventForm: FormGroup;

  startDate!: string;
  startTime!: string;
  endTime!: string;

  es = Spanish.es;

  metodosPago = [
    'Efectivo',
    'Yape',
    'BCP',
    'Interbank',
    'BBVA',
    'Transferencia',
  ];

  isRecurrente = false;
  terapiasId: string[] = [];
  paquetesId: any[] = [];

  avaiblePersonal: any[] = [];
  selectedHorarios: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      id_paciente: [null, Validators.required],
      id_paquete: [null, Validators.required],
      id_sede: [null, Validators.required],
      fecha_inicio: ['', Validators.required],
      id_tipocita: [null, Validators.required],
      metodo_pago: [null],
      detalle: this.fb.array([this.createDetalle()]),
    });
  }

  get detalle() {
    return this.eventForm.get('detalle') as FormArray;
  }

  changeTipoCita(event: any) {
    this.isRecurrente = event && event.recurrente;
    if (this.isRecurrente) {
    }
  }

  changePaquete(event: any, index?: number) {
    if (event) {
      this.selectedPaquete = event;
      this.eventForm.get('metodo_pago')?.setValidators([Validators.required]);

      const max = event.cantidadsesiones;
      this.detalle.setValidators(
        max ? this.maxSesionesSumValidator(max) : null
      );
    }

    this.detalle.updateValueAndValidity();

    const paqueteId = event?.id_paquetes || null;
    this.selectedPackageSubject.next(paqueteId);

    this.detalle.reset();
    this.selectedHorarios = [];
  }

  loadInitialTerapias() {
    this.terapiasListItems = [];

    // Initialize for each form item
    for (let i = 0; i < this.detalle.length; i++) {
      this.loadTerapiasForItem(i);
    }
  }

  createDetalle() {
    return this.fb.group({
      id_terapia: [null, Validators.required],
      num_sesiones: [null, [Validators.required, Validators.min(1)]],
      id_personal: [null, Validators.required],
      recurrencia: this.fb.control([]),
    });
  }

  maxSesionesSumValidator(maxSum: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !Array.isArray(control.value)) {
        return null;
      }

      const sum = control.value.reduce((total, item) => {
        return total + (item.num_sesiones || 0);
      }, 0);

      return sum > maxSum
        ? { maxSumExceeded: { maxSum, actualSum: sum } }
        : null;
    };
  }

  addInfoTerapia() {
    this.detalle.push(this.createDetalle());
    const index = this.detalle.length - 1;

    this.loadTerapiasForItem(index);
  }

  loadTerapiasForItem(index: number) {
    const loadingState = new BehaviorSubject<boolean>(true);

    // Create item-specific observable that reacts to package changes
    const terapiasObservable = this.selectedPackageSubject.pipe(
      switchMap((packageId) => {
        loadingState.next(true);

        // If packageId is null (default), get all terapias
        // Otherwise, get by package
        const observable = packageId
          ? this.terapiaService.getByPaquete(packageId)
          : this.terapiaService.getAll();

        return observable.pipe(
          map((resp: any) => resp.data),
          finalize(() => loadingState.next(false))
        );
      }),
      untilDestroyed(this)
    );

    // Store loading state and observable for this item
    this.terapiasListItems[index] = {
      observable: terapiasObservable,
      loading: loadingState,
    };
  }

  removeInfoTerapia(i: number) {
    this.detalle.removeAt(i);
    this.terapiasListItems.splice(i, 1);
  }

  ngOnInit() {
    // this.loadTerapias();
    this.loadSedes();
    this.loadPacientes();
    this.loadTipoCitas();
    this.loadPaquetes();

    this.loadInitialTerapias();
  }

  getTerapiaId(event: any, index: number) {
    const id_sede = this.eventForm.get('id_sede')?.value;
    const body = this.detalle.at(index).value;

    if (id_sede && body.id_terapia) {
      this.terapiaService
        .getPersonalByTerapia({ id_sede, id_terapia: body.id_terapia })
        .pipe(take(1))
        .subscribe({
          next: (resp: any) => {
            this.avaiblePersonal[index] = resp.data.personal || [];
          },
          error: () => {
            this.avaiblePersonal[index] = [];
          },
        });
    } else {
      this.avaiblePersonal[index] = [];
      this.detalle.at(index).get('id_personal')?.setValue(null);
    }

    this.eventForm.get('id_sede')?.valueChanges.subscribe(() => {
      console.log('cambio');
    });
  }

  ngAfterViewInit() {
    this.eventForm.valueChanges
      .pipe(
        distinctUntilChanged(
          (prev, curr) =>
            prev.id_sede === curr.id_sede &&
            JSON.stringify(prev.detalle) === JSON.stringify(curr.detalle)
        ),
        untilDestroyed(this)
      )
      .subscribe((value) => {
        const id_sede = value.id_sede;
        const detalle = value.detalle;

        detalle.forEach((control: any, index: number, array: any) => {
          const body = {
            id_terapia: array[index].id_terapia,
            fecha_inicio: array[index].fecha_inicio,
            id_sede,
          };

          const requiredFields = [body.id_terapia];

          if (requiredFields.every(Boolean) && id_sede) {
            this.terapiaService
              .getPersonalByTerapia(body)
              .pipe(take(1))
              .subscribe({
                next: (resp: any) => {
                  this.avaiblePersonal[index] = resp.data.personal || [];
                },
                error: () => {
                  this.avaiblePersonal[index] = [];
                },
              });
          } else {
            this.avaiblePersonal[index] = [];
            this.detalle
              .at(index)
              .get('id_personal')
              ?.setValue(null, { emitEvent: false });
          }
        });
      });
  }

  loadSedes() {
    this.sedesList = this.sedesService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadTipoCitas() {
    this.tipoCitaService
      .getAll()
      .pipe(
        map((resp) => resp.data),
        untilDestroyed(this),
        finalize(() => (this.loadingTipoCitas = false))
      )
      .subscribe((data) => {
        // const data = resp.data;
        const paquete = data.find((d) => d.nombre === 'Paquete');
        if (paquete) {
          this.eventForm.get('id_tipocita')?.setValue(paquete.id_tipocita);
        }
        return data;
      });
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

  closeModal() {
    this.activeModal.dismiss();
  }

  submitEvent() {
    const data = {
      ...this.eventForm.value,
      monto: this.selectedPaquete?.preciopaquete,
      sesiones_totales: this.selectedPaquete?.cantidadsesiones,
      num_cambios: this.selectedPaquete?.num_cambios,
    };
    this.citaService.createForTherapy(data).subscribe({
      next: (resp: any) => {
        if (resp.status === 'success') {
          this.toast.success(resp.message, 'Cita creada');
        } else {
          this.toast.info(resp.message, 'Cita creada', {
            disableTimeOut: true,
            closeButton: true,
          });
        }
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

  showHorarios(index: number) {
    const modalRef = this.modalService.open(ListHorariosComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.componentInstance.body = {
      id_personal: this.detalle.at(index).get('id_personal')?.value,
      fecha: this.eventForm.get('fecha_inicio')?.value,
    };

    modalRef.componentInstance.preSelections = {
      ...this.selectedHorarios[index],
    };

    modalRef.componentInstance.selectedSlots.subscribe((resp: any) => {
      this.selectedHorarios[index] = resp;
      this.detalle?.at(index)?.get('recurrencia')?.setValue(resp);
    });
  }
}
