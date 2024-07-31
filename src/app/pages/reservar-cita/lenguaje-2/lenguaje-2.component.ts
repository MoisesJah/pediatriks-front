import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS } from '../event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ModalEventComponent } from 'src/app/pages/reservar-cita/modal-event/modal-event.component';
import { ModalEditComponent } from 'src/app/pages/reservar-cita/modal-event/modal-edit/modal-edit.component';
import { CalendarEvent } from 'src/app/models/calendar-event';

@Component({
  selector: 'app-lenguaje-2',
  templateUrl: './lenguaje-2.component.html',
  styleUrl: './lenguaje-2.component.scss'
})
export class Lenguaje2Component implements AfterViewInit{
  @ViewChild(FullCalendarComponent)
  fullCalendarComponent!: FullCalendarComponent;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: esLocale
  };
  currentEvents: EventApi[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngAfterViewInit() {
    if (!this.fullCalendarComponent) {
      console.error('FullCalendarComponent no está disponible');
    }
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const modalRef = this.modalService.open(ModalEventComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.startDate = selectInfo.startStr;
    modalRef.componentInstance.endDate = selectInfo.endStr;

    modalRef.componentInstance.eventSubmitted.subscribe((newEvent: CalendarEvent) => {
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
          selectedPatient: newEvent.selectedPatient
        });
      }
    });
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
      selectedPatient: event.extendedProps.selectedPatient
    });

    const modalRef = this.modalService.open(ModalEventComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.event = {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      description: event.extendedProps.description || '',
      location: event.extendedProps.location || '',
      therapyType: event.extendedProps.therapyType || '',
      selectedPatient: event.extendedProps.selectedPatient || ''
    };

    modalRef.componentInstance.eventSubmitted.subscribe((updatedEvent: CalendarEvent) => {
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
            selectedPatient: updatedEvent.selectedPatient
          });

          // Forzar la detección de cambios para actualizar el componente
          this.forceUpdateEvent(updatedEvent);
        }
      }
    });

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
          selectedPatient: event.extendedProps.selectedPatient
        });
      }
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  navigateToDashboard(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard']);
  }

  navigateToSedes(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/sedes']);
  }

  navigateToReservarCita(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/reservar-cita']);
  }

  navigateToPsico1(event: Event, route: string): void {
    event.preventDefault();
    this.router.navigate([`/${route}`]);
  }

  handleSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    const validRoutes = [
      'reservar-cita',
      'psicologia-1', 'psicologia-2',
      'lenguaje-1', 'lenguaje-2', 'lenguaje-3',
      'ocupacional-1', 'ocupacional-2', 'ocupacional-3',
      'fisica-1', 'fisica-2', 'fisica-3',
      'neuro', 'pediasuit'
    ];

    if (validRoutes.includes(selectedValue)) {
      this.router.navigate([`/${selectedValue}`]);
    }
  }

  openModal() {
    const modalRef = this.modalService.open(ModalEventComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.startDate = this.getStartOfDay();
    modalRef.componentInstance.endDate = this.getEndOfDay();

    modalRef.componentInstance.eventSubmitted.subscribe((newEvent: CalendarEvent) => {
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
          selectedPatient: newEvent.selectedPatient
        });
      }
    });
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








