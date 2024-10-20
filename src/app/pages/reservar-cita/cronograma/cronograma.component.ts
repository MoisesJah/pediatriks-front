import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CitaService } from 'src/app/services/citas/cita.service';
import esLocale from '@fullcalendar/core/locales/es';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { Terapia } from 'src/app/models/terapia';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { CrearModalComponent } from './modals/crear-modal/crear-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalViewEventComponent } from '../modal-event/modal-view-event/modal-view-event.component';
import { DropdownComponent } from 'src/app/components/ui/dropdown/dropdown.component';
import { getWeekStartEndDates } from 'src/app/utils/getdatesFromWeek';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [
    FullCalendarModule,
    CommonModule,
    HeaderComponent,
    NgSelectModule,
    DropdownComponent,
  ],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.scss',
})
export class CronogramaComponent implements OnInit {
  @ViewChild('calendar') calendar!: FullCalendarComponent;
  citasService = inject(CitaService);
  modalService = inject(NgbModal);
  // activeModal = inject(NgbActiveModal);
  isLoading = inject(LoadingService).isLoading;
  terapiasService = inject(TerapiaService);
  router = inject(Router);
  terapiaId: string | undefined = this.route.snapshot.params['tag'];

  currentTerapia?: Terapia | undefined;
  loading: boolean = true;

  startWeek = getWeekStartEndDates().startOfWeek;
  endWeek = getWeekStartEndDates().endOfWeek;

  get bodyParams() {
    return {
      id_terapia: this.terapiaId!,
      startWeek: this.startWeek,
      endWeek: this.endWeek,
    };
  }

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.route.params.subscribe(() => {
      this.startWeek = this.calendar?.getApi()?.view.activeStart;
      this.endWeek = this.calendar?.getApi()?.view.activeEnd;
    });
  }

  citasEvent: Observable<EventApi[]> = new Observable();

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'timeGridWeek',
    allDaySlot: false,
    expandRows: true,
    slotLabelInterval: '00:05:00',
    slotMinTime: '08:00',
    slotMaxTime: '20:00:00',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'narrow',
    },
    selectAllow: (selectInfo) => {
      const now = new Date();
      const isTimeGrid = this.calendar?.getApi()?.view.type == 'timeGridWeek';
      const currentStartWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
      currentStartWeek.setHours(0, 0, 0, 0);
      return selectInfo.start >= currentStartWeek && isTimeGrid;
    },
    selectable: true,
    selectLongPressDelay: 10,
    weekends: true,
    editable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    },
    eventClick: this.handleEventClick.bind(this),
    loading: (isLoading) => {
      this.loading = isLoading;
    },
    locale: esLocale,
    select: this.handleDateSelect.bind(this),
    datesSet: (arg) => {
      this.startWeek = arg.view.activeStart;
      this.endWeek = arg.view.activeEnd;
      this.loadCitas(this.bodyParams);
    },
  };

  ngOnInit(): void {
    this.route.params
      .pipe(tap(({ tag }) => (this.terapiaId = tag)))
      .subscribe((e) => {
        this.loadCurrentTerapia(), this.loadCitas(this.bodyParams);
      });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const modalRef = this.modalService.open(CrearModalComponent, {
      size: 'lg',
      centered: true,
      // backdrop: 'static',
    });
    modalRef.componentInstance.terapia = this.currentTerapia;

    modalRef.componentInstance.createForm.patchValue({
      fecha_inicio: selectInfo.startStr.substring(0, 10),
      hora_inicio: selectInfo.startStr.substring(11, 16),
      hora_fin: selectInfo.endStr.substring(11, 16),
    });

    modalRef.componentInstance.eventSubmitted.subscribe(() => {
      this.loadCitas(this.bodyParams);
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    const event = clickInfo.event;

    const modalRef = this.modalService.open(ModalViewEventComponent, {
      centered: true,
      size: '100',
      scrollable: true,
      backdrop: 'static',
    });

    window.document.body.classList.add('modal-open');

    modalRef.componentInstance.eventId = event.id;
    modalRef.componentInstance.citaId = event.extendedProps.id_cita;
    modalRef.componentInstance.eventUpdated.subscribe(() => {
      this.loadCitas(this.bodyParams);
    });
  }

  loadCitas(body: any) {
    if (this.terapiaId) {
      return (this.citasEvent = this.citasService.getByTerapia(body).pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        map((resp) => resp.data)
      ));
    }
  }

  loadCurrentTerapia() {
    return this.terapiasService
      .getById(this.terapiaId!)
      .pipe(
        map((resp) => (this.currentTerapia = resp.data)),
        tap(
          () =>
            (this.calendarOptions = {
              ...this.calendarOptions,
              slotDuration: this.currentTerapia?.duracion,
            })
        )
      )
      .subscribe();
  }
}
