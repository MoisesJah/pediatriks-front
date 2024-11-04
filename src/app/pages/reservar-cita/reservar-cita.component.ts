import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  inject,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
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
import esLocale from '@fullcalendar/core/locales/es';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ModalCreateEventComponent } from 'src/app/pages/reservar-cita/modal-event/modal-event.component';
import { ModalEditComponent } from 'src/app/pages/reservar-cita/modal-event/modal-edit/modal-edit.component';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { Cronogramas } from 'src/app/fake/cronograma';
import { Cronograma } from 'src/app/models/cronograma';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, shareReplay, Subscription, takeLast } from 'rxjs';
import { ModalViewEventComponent } from './modal-event/modal-view-event/modal-view-event.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { LoadingService } from 'src/app/services/loading.service';
import { EventImpl } from '@fullcalendar/core/internal';
import { getWeekStartEndDates } from 'src/app/utils/getdatesFromWeek';
import { DropdownComponent } from 'src/app/components/ui/dropdown/dropdown.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.component.html',
  styleUrls: ['./reservar-cita.component.scss'],
})
export class ReservarCitaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(FullCalendarComponent)
  fullCalendarComponent!: FullCalendarComponent;
  @ViewChild('dropdown', { static: true }) dropdown!: DropdownComponent;

  citasService = inject(CitaService);
  terapiasService = inject(TerapiaService);
  isLoading = inject(LoadingService).isLoading;
  cronogramas: Cronograma[] = Cronogramas;
  cronogramaActual: Cronograma | undefined;

  citasEvent: Observable<EventApi[]> = new Observable();
  terapiasList: { id_terapia: string; nombre: string }[] = [];

  subscriptions: Subscription[] = [];
  listLoading = false;

  startWeek = getWeekStartEndDates().startOfWeek;
  endWeek = getWeekStartEndDates().endOfWeek;

  get bodyParams() {
    return {
      startWeek: this.startWeek,
      endWeek: this.endWeek,
    };
  }

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    allDaySlot: false,
    expandRows: true,
    // slotEventOverlap: false,
    // eventMaxStack: 1,
    slotDuration: '00:45:00',
    slotMinTime: '08:00',
    slotMaxTime: '20:01:00',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'narrow',
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    locale: esLocale,
    datesSet: (arg) => {
      this.startWeek = arg.view.activeStart;
      this.endWeek = arg.view.activeEnd;
      // this.loadCitas(this.bodyParams);
      this.loadFilteredCitas();
    },
  };

  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // this.loadFilteredCitas();
  }

  loadFilteredCitas() {
    this.dropdown.selectedItems.subscribe((items) => {
      if (items.length > 0) {
        this.loadCitas({
          ...this.bodyParams,
          filter: true,
          idsPersonal: items,
        });
      }

      if (items.length === 0) {
        this.loadCitas(this.bodyParams);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  loadCitas(body: any) {
    this.citasEvent = this.citasService.getAll(body).pipe(
      takeLast(1),
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const modalRef = this.modalService.open(ModalCreateEventComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.componentInstance.eventForm.patchValue({
      fecha_inicio: selectInfo.startStr.substring(0, 10),
      hora_inicio: selectInfo.startStr.substring(11, 16),
      hora_fin: selectInfo.endStr.substring(11, 16),
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

    modalRef.componentInstance.eventId = event.id;
    modalRef.componentInstance.citaId = event.extendedProps.id_cita;
    modalRef.componentInstance.eventUpdated.subscribe(() => {
      this.loadCitas(this.bodyParams);
    });
  }

  openModal() {
    const modalRef = this.modalService.open(ModalCreateEventComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.componentInstance.eventSubmitted.subscribe(() => {
      this.loadCitas(this.bodyParams);
    });
  }
}
