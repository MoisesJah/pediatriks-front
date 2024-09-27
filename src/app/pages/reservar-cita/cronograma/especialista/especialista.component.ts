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
import { Observable } from 'rxjs';
import { Personal } from 'src/app/models/personal';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { DropdownComponent } from '../../../../components/ui/dropdown/dropdown.component';
import { HeaderComponent } from '../../../../components/ui/header/header.component';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-especialista',
  standalone: true,
  imports: [
    HeaderComponent,
    DropdownComponent,
    FullCalendarModule,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './especialista.component.html',
  styleUrl: './especialista.component.scss',
})
export class EspecialistaComponent implements OnInit {
  isLoading = inject(LoadingService).isLoading;
  @ViewChild('calendar') calendar!: FullCalendarComponent;
  citasService = inject(CitaService);
  modalService = inject(NgbModal);

  router = inject(Router);
  currentPersonal: Personal | undefined;

  citasEvent: Observable<EventApi[]> = new Observable();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((e)=>console.log(e))
  }

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },

    allDaySlot: false,
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: esLocale,
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
  };
  


}
