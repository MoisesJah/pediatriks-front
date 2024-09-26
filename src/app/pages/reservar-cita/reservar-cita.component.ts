import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  inject,
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
import { INITIAL_EVENTS } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ModalCreateEventComponent } from 'src/app/pages/reservar-cita/modal-event/modal-event.component';
import { ModalEditComponent } from 'src/app/pages/reservar-cita/modal-event/modal-edit/modal-edit.component';
import { CalendarEvent } from 'src/app/models/calendar-event';
import { Cronogramas } from 'src/app/fake/cronograma';
import { Cronograma } from 'src/app/models/cronograma';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { ModalViewEventComponent } from './modal-event/modal-view-event/modal-view-event.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { Terapia } from 'src/app/models/terapia';
import { LoadingService } from 'src/app/services/loading.service';
import { EventImpl } from '@fullcalendar/core/internal';
import { getWeekStartEndDates } from 'src/app/utils/getdatesFromWeek';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.component.html',
  styleUrls: ['./reservar-cita.component.scss'],
})
export class ReservarCitaComponent implements OnInit, OnDestroy {
  @ViewChild(FullCalendarComponent)
  fullCalendarComponent!: FullCalendarComponent;

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
    // eventColor: '#ffe082',
    expandRows:true,
    // eventTextColor: 'black',
    eventMinHeight: 30,
    // slotDuration: '00:45:00',
    slotDuration: '00:45:00',
    // slotLabelInterval: '00:45:00',
    slotMinTime: '08:00',
    slotMaxTime: '20:01:00',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'narrow',
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    // selectable: true,
    // select: this.handleDateSelect.bind(this),
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: esLocale,
    datesSet: (arg) => {
      this.startWeek = arg.view.activeStart;
      this.endWeek = arg.view.activeEnd;
      this.loadCitas(this.bodyParams);
    },
  };

  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  loadCitas(body: any) {
    this.citasEvent = this.citasService.getAll(body).pipe(
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
    })

    // modalRef.componentInstance.eventSubmitted.subscribe(
    //   (newEvent: CalendarEvent) => {
    //     if (this.fullCalendarComponent) {
    //       const calendarApi = this.fullCalendarComponent.getApi();
    //       calendarApi.addEvent({
    //         id: newEvent.id,
    //         title: newEvent.title,
    //         start: newEvent.start,
    //         end: newEvent.end,
    //         description: newEvent.description,
    //         location: newEvent.location,
    //         therapyType: newEvent.therapyType,
    //         selectedPatient: newEvent.selectedPatient,
    //         doctor: newEvent.doctor, // Asegúrate de agregar el campo doctor aquí
    //       });
    //     }
    //   }
    // );
  }

  handleEventClick(clickInfo: EventClickArg) {
    const event = clickInfo.event;
    console.log(clickInfo);

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

  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
    // this.changeDetector.detectChanges();
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
