import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { CurrentPersonal } from '../../reservar-cita/cronograma/especialista/especialista.component';
import { map, Observable, tap } from 'rxjs';
import { CalendarOptions, EventApi, EventClickArg } from '@fullcalendar/core';
import { getWeekStartEndDates } from 'src/app/utils/getdatesFromWeek';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { UserService } from 'src/app/services/user/user.service';
import { ModalViewEventComponent } from '../../reservar-cita/modal-event/modal-view-event/modal-view-event.component';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [HeaderComponent, FullCalendarModule,CommonModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss',
})
export class CitasComponent implements OnInit {
  @ViewChild('calendar') calendar!: FullCalendarComponent;
  isLoading = inject(LoadingService).isLoading;
  modalService = inject(NgbModal);
  loadingCalendar = false;
  citasService = inject(CitaService);
  userService = inject(AuthService);
  personalService = inject(PersonalService);

  router = inject(Router);
  currentPersonal!: CurrentPersonal;

  citasEvent: Observable<EventApi[]> = new Observable();

  personalId: string | undefined = '';

  startWeek = getWeekStartEndDates().startOfWeek;
  endWeek = getWeekStartEndDates().endOfWeek;

  ngOnInit(): void {
    this.getPersonalId();
  }

  get bodyParams() {
    return {
      id_personal: this.personalId!,
      startWeek: this.startWeek,
      endWeek: this.endWeek,
    };
  }

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    eventMaxStack: 1,
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
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    },
    selectConstraint: 'businessHours',
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    loading: (isLoading) => {
      this.loadingCalendar = isLoading;
    },
    // select: (arg) => this.handleClick(arg),
    eventClick: this.handleEventClick.bind(this),
    selectAllow: (selectInfo) => {
      const isTimeGrid = this.calendar?.getApi()?.view.type == 'timeGridWeek';
      const currentStartWeek = new Date();
      currentStartWeek.setHours(0, 0, 0, 0);
      return selectInfo.start >= currentStartWeek && isTimeGrid;
    },
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    locale: esLocale,
    datesSet: (arg) => {
      this.startWeek = arg.view.activeStart;
      this.endWeek = arg.view.activeEnd;
      this.loadCitas(this.bodyParams);
    },
  };

  getPersonalId(){
    this.personalService.getPersonalByUser(this.userService.user()?.id!).pipe(
      map((resp: any) => resp.data.id_personal),
      tap((id) => this.personalId = id),
      tap(() => this.loadCitas(this.bodyParams)),
      untilDestroyed(this)
    ).subscribe();
  }

  loadCitas(params: any) {
    if (this.personalId) {
      return (this.citasEvent = this.citasService
        .getByPersonal(params)
        .pipe(map((resp) => resp.data),
          untilDestroyed(this)));
    }
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
    // modalRef.componentInstance.horarios = this.currentPersonal?.horarios;
    modalRef.componentInstance.citaId = event.extendedProps.id_cita;
    modalRef.componentInstance.eventUpdated.subscribe(() => {
      this.loadCitas(this.bodyParams);
    });
  }
}
