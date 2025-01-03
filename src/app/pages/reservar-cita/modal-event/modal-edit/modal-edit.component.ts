import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
  viewChild,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { PersonalService } from 'src/app/services/personal/personal.service';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  finalize,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoadingService } from 'src/app/services/loading.service';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import { SesionstatusService } from 'src/app/services/status/sesionstatus.service';
import { CitaService } from 'src/app/services/citas/cita.service';
import { Cita } from 'src/app/models/cita';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { EnterAnimation } from 'src/app/utils/animations';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
  animations: [EnterAnimation],
})
export class ModalEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();
  @ViewChild('fechaInicio') fechaInicio!: ElementRef;

  personalService = inject(PersonalService);
  citaService = inject(CitaService);
  fichasService = inject(FichasService);
  toast = inject(ToastrService);
  isTerapista = inject(AuthService).isTerapista();
  statusService = inject(SesionstatusService);
  isLoading = inject(LoadingService).isLoading;

  event: Cita | null = null;
  editEventForm: FormGroup;
  horarios: number[] = [];

  selectedStatus: any;
  fichasLoading = false

  personalList: Observable<Personal[]> = new Observable();
  statusList: Observable<any[]> = new Observable();
  fichasList: Observable<any[]> = new Observable();

  fechaOptions: FlatpickrDefaultsInterface = {
    locale: { ...Spanish },
    altInput: true,
    altFormat: 'j/n/Y',
    // disable: [
    //   (date) => {
    //     // if(this.horarios.length){
    //     //   console.log(this.horarios)
    //     //   return !this.horarios.includes(date.getDay());
    //     // }
    //     // return false;
    //     return this.horarios.length > 0 && !this.horarios.includes(date.getDay());
    //   },
    // ],
  };

  getCambiosRestantes() {
    return this.event && this.event.num_cambios;
  }

  canEditSession() {
    return !this.event || this.event.num_cambios > 0;
  }

  getIcon(status: string): string {
    switch (status) {
      case 'Programado':
        return 'h-10px w-10px rounded-circle bg-primary';
      case 'Asistió':
        return 'h-10px w-10px rounded-circle bg-success';
      case 'No Asistió':
        return 'h-10px w-10px rounded-circle bg-danger';
      default:
        return '';
    }
  }

  horaInicioOptions: FlatpickrDefaultsInterface = {
    enableTime: !this.isTerapista,
    noCalendar: true,
    minTime: '08:00',
    maxTime: '20:00',
    dateFormat: 'H:i',
  };

  horaFinOptions: FlatpickrDefaultsInterface = {
    enableTime: !this.isTerapista,
    noCalendar: true,
    minTime: '08:00',
    maxTime: '20:00',
    dateFormat: 'H:i',
  };

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.editEventForm = this.fb.group({
      id_personal: [null],
      fecha_inicio: [null, Validators.required],
      hora_inicio: [null],
      hora_fin: [null],
      id_status: [null, Validators.required],
      sesiones_restantes: [true],
    });
  }

  get minutesTerapia() {
    return Number(this.event?.terapia.duracion.split(':')[1]);
  }

  endTimeValidation() {
    const horaInicio = this.editEventForm.get('hora_inicio')?.value;

    if (horaInicio) {
      const [hours, minutes] = horaInicio.split(':').map(Number);
      const newMinutes = minutes + this.minutesTerapia;
      const newHours = hours + Math.floor(newMinutes / 60);
      const remainingMinutes = newMinutes % 60;

      this.editEventForm
        .get('hora_fin')
        ?.setValue(
          `${newHours.toString().padStart(2, '0')}:${remainingMinutes
            .toString()
            .padStart(2, '0')}`,
          { emitEvent: false }
        );
    }
  }

  ngOnInit() {
    if (!this.isTerapista) {
      this.loadPersonal();
    }
    // if(this.selectedStatus !== null){
    //   console.log(this.selectedStatus)
    //   this.getFichas();
    // }

    this.loadStatus();
    if (this.event) {
      this.loadCurrentSesion();
    }
  }

  onChangePersonal(event: any) {
    if (event.id_personal && !this.isTerapista) {
      this.personalService
        .getById(event.id_personal)
        .pipe(
          map((resp) => [
            ...new Set(resp.data.horarios.map((horario) => horario.dia_semana)),
          ]),
          tap((horarios) => {
            this.horarios = horarios;
            this.initFlatpickr(horarios);
          })
        )
        .subscribe();
    }
  }
  changeStatus(event: any) {
    console.log(event)
    this.selectedStatus =
      event && event.nombre === 'Asistió' ? event.nombre : null;
  }

  getFichas() {
    this.fichasLoading = true
    this.fichasList = this.fichasService
      .getBySesion(this.event?.sesion.id_sesion!)
      .pipe(
        map((resp) => resp.data),
        finalize(() => (this.fichasLoading = false)),
        untilDestroyed(this)
      );
  }

  initFlatpickr(disabledDays: number[]) {
    if (this.fechaInicio) {
      flatpickr(this.fechaInicio.nativeElement, {
        locale: { ...Spanish },
        altInput: true,
        altFormat: 'd/m/Y',
        minDate: this.event?.sesion.fecha_inicio,
        disable: [
          (date) => {
            return !disabledDays.includes(date.getDay());
          },
        ],
      });
    }
  }

  ngAfterViewInit() {
    this.editEventForm.get('id_status')?.valueChanges.subscribe((value) => {
      if(value === 2){
        this.getFichas()
      }
    });
    this.editEventForm.valueChanges.subscribe(() => this.endTimeValidation());
    this.editEventForm.valueChanges
      .pipe(distinctUntilKeyChanged('id_personal'))
      .subscribe((resp) => {
        if (resp.id_personal) {
          this.onChangePersonal(resp);
        }
      });

      window.addEventListener('focus', () => {
        this.getFichas()
      })
  }

  ngOnDestroy(): void {
    window.removeEventListener('focus', () => {
      this.getFichas()
    })
  }

  loadPersonal() {
    this.personalService
      .getByTerapia(this.event?.terapia.id_terapia!)
      .pipe(untilDestroyed(this))
      .subscribe((resp) => {
        this.personalList = of(resp.data);
        // console.log(resp.data);
      });
  }

  loadStatus() {
    this.statusList = this.statusService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  closeModal() {
    this.activeModal.dismiss(); // Cierra el modal sin realizar cambios
  }

  loadCurrentSesion() {
    const id_cita = this.event?.id_cita!;
    const id_sesion = this.event?.sesion.id_sesion!;

    this.citaService
      .getById(id_cita, id_sesion)
      .pipe(untilDestroyed(this))
      .subscribe((resp) => {
        this.editEventForm.patchValue({
          id_cita: resp.data.id_cita,
          id_sesion: resp.data.sesion.id_sesion,
          id_personal: resp.data.sesion.personal.id_personal,
          id_status: resp.data.sesion.status.id_status,
          fecha_inicio: resp.data.sesion.fecha_inicio,
          hora_inicio: resp.data.sesion.hora_inicio,
          hora_fin: resp.data.sesion.hora_fin,
        });
      });
  }

  updateEvent() {
    if (this.editEventForm.valid) {
      this.citaService
        .update(this.event?.id_cita!, {
          ...this.editEventForm.value,
          id_cita: this.event?.id_cita!,
          id_sesion: this.event?.sesion.id_sesion!,
        })
        .subscribe({
          next: () => {
            this.eventUpdated.emit();
            this.closeModal();
          },
          error: (err) => {
            if (err.error.errors) {
              const errors = Object.values(err.error.errors).join('');
              this.toast.error(errors, 'Error');
            } else {
              this.toast.error(
                'Ocurrió un error al actualizar la cita',
                'Error'
              );
            }
          },
        });
    }
  }
}
