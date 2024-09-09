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
  cronogramas: Cronograma[] = Cronogramas;
  cronogramaActual: Cronograma | undefined;

  // citas: Cita[] = [];

  citasEvent: Observable<EventInput[]> = new Observable();

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
    // initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: esLocale,
  };

  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit() {
    // const tag = this.rutaActiva.snapshot.params.tag;
    // this.cronogramaActual = this.cronogramas.find(c => c.tag === tag);
    // const termSub = this.rutaActiva.params.pipe ( map ( ( p ) => p[ 'tag' ])).subscribe ( p => {
    // this.cronogramaActual = this.cronogramas.find(c => c.tag === p);
    // });
    // this.subscriptions.push( termSub );
    this.loadCitas();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  loadCitas() {
    // this.citasService.getAll().subscribe((resp) => {
    //   this.citasEvent = resp.data
    // });
    this.citasEvent = this.citasService.getAll().pipe(
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

    console.log('Evento clickeado:', {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      description: event.extendedProps.description,
      location: event.extendedProps.location,
      therapyType: event.extendedProps.therapyType,
      selectedPatient: event.extendedProps.selectedPatient,
      doctor: event.extendedProps.doctor, // Asegúrate de mostrar el campo doctor aquí
    });

    const modalRef = this.modalService.open(ModalViewEventComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.event = {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      description: event.extendedProps.description || '',
      location: event.extendedProps.location || '',
      therapyType: event.extendedProps.therapyType || '',
      selectedPatient: event.extendedProps.selectedPatient || '',
      doctor: event.extendedProps.doctor || '', // Asegúrate de agregar el campo doctor aquí
    };

    modalRef.componentInstance.eventSubmitted.subscribe(
      (updatedEvent: CalendarEvent) => {
        console.log('Evento actualizado recibido del modal:', updatedEvent);

        if (this.fullCalendarComponent) {
          const calendarApi = this.fullCalendarComponent.getApi();
          const existingEvent = calendarApi.getEventById(updatedEvent.id);
          if (existingEvent) {
            existingEvent.remove();
            calendarApi.addEvent({
              id: updatedEvent.id,
              title: updatedEvent.title,
              start: updatedEvent.start,
              end: updatedEvent.end,
              description: updatedEvent.description,
              location: updatedEvent.location,
              therapyType: updatedEvent.therapyType,
              selectedPatient: updatedEvent.selectedPatient,
              doctor: updatedEvent.doctor, // Asegúrate de agregar el campo doctor aquí
            });

            // Forzar la detección de cambios para actualizar el componente
            this.forceUpdateEvent(updatedEvent);
          }
        }
      }
    );

    modalRef.componentInstance.eventDeleted.subscribe((eventId: string) => {
      if (this.fullCalendarComponent) {
        const calendarApi = this.fullCalendarComponent.getApi();
        const existingEvent = calendarApi.getEventById(eventId);
        if (existingEvent) {
          existingEvent.remove();
        }
      }
    });
  }

  forceUpdateEvent(updatedEvent: CalendarEvent) {
    if (this.fullCalendarComponent) {
      const calendarApi = this.fullCalendarComponent.getApi();
      const event = calendarApi.getEventById(updatedEvent.id);
      if (event) {
        event.setProp('end', updatedEvent.end);
        console.log('Evento forzado a actualizar:', {
          id: event.id,
          title: event.title,
          start: event.startStr,
          end: event.endStr,
          description: event.extendedProps.description,
          location: event.extendedProps.location,
          therapyType: event.extendedProps.therapyType,
          selectedPatient: event.extendedProps.selectedPatient,
          doctor: event.extendedProps.doctor, // Asegúrate de agregar el campo doctor aquí
        });
      }
    }
  }

  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
    // this.changeDetector.detectChanges();
  }

  handleSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    const validRoutes = [
      'reservar-cita',
      'psicologia-1',
      'psicologia-2',
      'lenguaje-1',
      'lenguaje-2',
      'lenguaje-3',
      'ocupacional-1',
      'ocupacional-2',
      'ocupacional-3',
      'fisica-1',
      'fisica-2',
      'fisica-3',
      'neuro',
      'pediasuit',
    ];

    if (validRoutes.includes(selectedValue)) {
      this.router.navigate([`/reservar-cita/${selectedValue}`]);
    }
  }

  openModal() {
    const modalRef = this.modalService.open(ModalCreateEventComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.componentInstance.startDate = this.getStartOfDay();
    modalRef.componentInstance.endDate = this.getEndOfDay();

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

  private getStartOfDay(): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
  }

  private getEndOfDay(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString();
  }
}
