import { Component, inject, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, HeaderComponent],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.scss',
})
export class CronogramaComponent implements OnInit {
  citasService = inject(CitaService);
  terapiaId: string | undefined;

  constructor(private route: ActivatedRoute) {}

  citasEvent: Observable<EventApi[]> = new Observable();

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
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
    locale: esLocale,
    datesSet: (arg) => {
      const gridMonth = arg.view.currentStart.getMonth() + 1;
      const gridYear = arg.view.currentStart.getFullYear();
      this.loadCitas(gridMonth, gridYear);
    }
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.terapiaId = params['tag'];
      console.log(params);
    });
  }

  loadCitas(month: number, year: number) {
    if (this.terapiaId) {
      this.citasEvent = this.citasService
        .getByTerapia(this.terapiaId, month, year)
        .pipe(map((data) => data.data));
    }
  }
}
