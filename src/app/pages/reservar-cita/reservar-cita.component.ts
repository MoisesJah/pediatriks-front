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

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: esLocale,
    datesSet: (arg) => {
      const gridMonth = arg.view.currentStart.getMonth() + 1;
      const gridYear = arg.view.currentStart.getFullYear();
      this.loadCitas(gridMonth, gridYear);
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
    this.loadTerapias();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  loadCitas(month?: number, year?: number) {
    this.citasEvent = this.citasService.getAll(month, year).pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadTerapias() {
    this.terapiasService.getAll().subscribe((resp) => {
      this.terapiasList = resp.data.map((t: Terapia) => ({
        id_terapia: t.id_terapia,
        nombre: t.nombre,
      }));
    });
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

    modalRef.componentInstance.startDate = selectInfo.startStr;
    modalRef.componentInstance.endDate = selectInfo.endStr;

    modalRef.componentInstance.eventSubmitted.subscribe(
      (newEvent: CalendarEvent) => {
        if (this.fullCalendarComponent) {
          const calendarApi = this.fullCalendarComponent.getApi();
          calendarApi.addEvent({
            id: newEvent.id,
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            description: newEvent.description,
            location: newEvent.location,
            therapyType: newEvent.therapyType,
            selectedPatient: newEvent.selectedPatient,
            doctor: newEvent.doctor, // Asegúrate de agregar el campo doctor aquí
          });
        }
      }
    );
  }

  handleEventClick(clickInfo: EventClickArg) {
    const event = clickInfo.event;


    const modalRef = this.modalService.open(ModalViewEventComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.eventId = event.id;

    //     console.log('Evento actualizado recibido del modal:', updatedEvent);

    //     if (this.fullCalendarComponent) {
    //       const calendarApi = this.fullCalendarComponent.getApi();
    //       const existingEvent = calendarApi.getEventById(updatedEvent.id);
    //       if (existingEvent) {
    //         existingEvent.remove();
    //         calendarApi.addEvent({
    //           id: updatedEvent.id,
    //           title: updatedEvent.title,
    //           start: updatedEvent.start,
    //           end: updatedEvent.end,
    //           description: updatedEvent.description,
    //           location: updatedEvent.location,
    //           therapyType: updatedEvent.therapyType,
    //           selectedPatient: updatedEvent.selectedPatient,
    //           doctor: updatedEvent.doctor, // Asegúrate de agregar el campo doctor aquí
    //         });

    //         // Forzar la detección de cambios para actualizar el componente
    //         this.forceUpdateEvent(updatedEvent);
    //       }
    //     }
    //   }
    // );

    // modalRef.componentInstance.eventDeleted.subscribe((eventId: string) => {
    //   if (this.fullCalendarComponent) {
    //     const calendarApi = this.fullCalendarComponent.getApi();
    //     const existingEvent = calendarApi.getEventById(eventId);
    //     if (existingEvent) {
    //       existingEvent.remove();
    //     }
    //   }
    // });
  }

  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
    // this.changeDetector.detectChanges();
  }

  handleSelectChange(event: any) {
    const selectedValue = event.id_terapia;
    // this.router.navigate(['admin/reservar-cita', selectedValue],{relativeTo: this.route});
    this.router.navigate([selectedValue], { relativeTo: this.route });
  }

  openModal() {
    const modalRef = this.modalService.open(ModalCreateEventComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.componentInstance.eventSubmitted.subscribe(
      (newEvent: CalendarEvent) => {
        if (this.fullCalendarComponent) {
          const calendarApi = this.fullCalendarComponent.getApi();
          calendarApi.addEvent({
            id: newEvent.id,
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            description: newEvent.description,
            location: newEvent.location,
            therapyType: newEvent.therapyType,
            selectedPatient: newEvent.selectedPatient,
            doctor: newEvent.doctor, // Asegúrate de agregar el campo doctor aquí
          });
        }
      }
    );
  }

}
