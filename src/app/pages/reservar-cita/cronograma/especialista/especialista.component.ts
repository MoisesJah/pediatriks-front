import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, tap } from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { DropdownComponent } from '../../../../components/ui/dropdown/dropdown.component';
import { HeaderComponent } from '../../../../components/ui/header/header.component';
import esLocale from '@fullcalendar/core/locales/es';
import { getWeekStartEndDates } from 'src/app/utils/getdatesFromWeek';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-especialista',
  standalone: true,
  imports: [
    HeaderComponent,
    DropdownComponent,
    FullCalendarModule,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.scss',
})
export class EspecialistaComponent implements OnInit {
  @ViewChild('calendar') calendar!: FullCalendarComponent;
  isLoading = inject(LoadingService).isLoading;
  modal = inject(NgbModal);
  citasService = inject(CitaService);
  personalService = inject(PersonalService);
  modalService = inject(NgbModal);

  router = inject(Router);
  currentPersonal: Personal | undefined;

  citasEvent: Observable<EventApi[]> = new Observable();

  personalId: string | undefined = this.route.snapshot.params['terapist'];

  startWeek = getWeekStartEndDates().startOfWeek;
  endWeek = getWeekStartEndDates().endOfWeek;

  get bodyParams() {
    return {
      id_personal: this.personalId!,
      startWeek: this.startWeek,
      endWeek: this.endWeek,
    };
  }

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(() => {
      this.startWeek = this.calendar?.getApi()?.view.activeStart;
      this.endWeek = this.calendar?.getApi()?.view.activeEnd;
    });
  }

  ngOnInit(): void {
    this.route.params
      .pipe(tap(({ terapist }) => (this.personalId = terapist)))
      .subscribe((e) => {
        // console.log(e);
        this.loadCitas(this.bodyParams);
        this.loadCurrentPersonal();
      });
  }

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    allDaySlot: false,
    expandRows: true,
    eventMinHeight: 30,
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
    dateClick: function (info) {
      // console.log('dateClick', info.);
    },
    selectConstraint: {
      
    },
    businessHours: {
      // allow
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    loading(isLoading) {
      console.log('isLoading', isLoading);
    },
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: esLocale,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
  };

  handleClick() {
    console.log('handleClick');
  }

  

  loadCitas(params: any) {
    this.citasEvent = this.citasService
      .getByPersonal(params)
      .pipe(map((resp) => resp.data));
  }

  loadCurrentPersonal() {
    this.personalService.getById(this.personalId!).subscribe((resp) => {
      this.currentPersonal = resp.data;
    })
  }
}
