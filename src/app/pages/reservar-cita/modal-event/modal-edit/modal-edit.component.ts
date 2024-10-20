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
  filter,
  finalize,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoadingService } from 'src/app/services/loading.service';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { SesionstatusService } from 'src/app/services/status/sesionstatus.service';
import { CitaService } from 'src/app/services/citas/cita.service';
import { Cita } from 'src/app/models/cita';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit, AfterViewInit {
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();

  personalService = inject(PersonalService);
  citaService = inject(CitaService);
  toast = inject(ToastrService)
  statusService = inject(SesionstatusService);
  isLoading = inject(LoadingService).isLoading;

  event: Cita | null = null;
  editEventForm: FormGroup;

  personalList: Observable<Personal[]> = new Observable();
  statusList: Observable<any[]> = new Observable();

  fechaOptions: FlatpickrDefaultsInterface = {
    locale: { ...Spanish },
    altInput: true,
    altFormat: 'd/m/Y',
  };

  getCambiosRestantes() {
    return this.event?.sesion.num_cambios
      ? 3 - this.event.sesion.num_cambios
      : 3;
  }
  
  canEditSession() {
    return !this.event || this.event.sesion.num_cambios < 3;
  }

  getIcon(status: string): string {
    switch (status) {
      case 'Programado':
      case 'Asistió':
        return 'h-10px w-10px rounded-circle bg-success';
      case 'No Asistió':
        return 'h-10px w-10px rounded-circle bg-danger';
      default:
        return '';
    }
  }

  horaInicioOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
  };

  horaFinOptions: FlatpickrDefaultsInterface = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
  };

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.editEventForm = this.fb.group({
      descripcion: [null],
      id_personal: [null],
      fecha_inicio: [null],
      hora_inicio: [null],
      hora_fin: [null],
      id_status: [null],
      sesiones_restantes: [true],
    });
  }

  endTimeValidation() {
    const horaInicio = this.editEventForm.get('hora_inicio')?.value;
    const horaFin = this.editEventForm.get('hora_fin')?.value;
    if (horaFin < horaInicio) {
      this.editEventForm.get('hora_fin')?.setValue(horaInicio);
    }
  }

  ngOnInit() {
    this.loadPersonal();
    this.loadStatus();
    this.loadCurrentSesion();
  }

  ngAfterViewInit() {
    this.editEventForm.valueChanges.subscribe(() => this.endTimeValidation());
  }

  loadPersonal() {
    // this.personalList = this.personalService.getByTerapia(this.event?.terapia.id_terapia!).pipe(
    //   map((resp) => resp.data),
    //   untilDestroyed(this)
    // )
    // console.log(this.personalList);
    this.personalService
      .getByTerapia(this.event?.terapia.id_terapia!)
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

    this.citaService.getById(id_cita, id_sesion).subscribe((resp) => {
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
              'Ocurrió un error al crear la cita',
              'Error'
            );
          }
        },
      });
  }
}
