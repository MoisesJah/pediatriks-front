import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
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
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { Terapia } from 'src/app/models/terapia';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { CrearModalComponent } from './modals/crear-modal/crear-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalViewEventComponent } from '../modal-event/modal-view-event/modal-view-event.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, HeaderComponent, NgSelectModule],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.scss',
})
export class CronogramaComponent implements OnInit {
  citasService = inject(CitaService);
  modalService = inject(NgbModal);
  // activeModal = inject(NgbActiveModal);
  isLoading = inject(LoadingService).isLoading;
  terapiasService = inject(TerapiaService);
  router = inject(Router);
  terapiaId: string | undefined;
  terapiasList: { id_terapia: string; nombre: string }[] = [];

  currentTerapia: Terapia | undefined;

  gridMonth = new Date().getMonth() + 1;
  gridYear = new Date().getFullYear();

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
    eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
    locale: esLocale,
    datesSet: (arg) => {
      this.gridMonth = arg.view.currentStart.getMonth() + 1;
      this.gridYear = arg.view.currentStart.getFullYear();
      this.loadCitas(this.gridMonth, this.gridYear);
    },
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.terapiaId = params['tag'];
      this.loadCurrentTerapia();
      this.loadTerapias();
      this.loadCitas(this.gridMonth, this.gridYear);
    });
  }

  openModal() {
    const modalRef = this.modalService.open(CrearModalComponent, {
      size: 'lg',
      centered: true,
      // backdrop: 'static',
    });
    modalRef.componentInstance.terapia = this.currentTerapia;
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

    modalRef.componentInstance.eventSubmitted.subscribe(() => {
      this.loadCitas(this.gridMonth, this.gridYear);
    })
  }

  handleSelectChange(event: any) {
    const terapia = event as { id_terapia: string; nombre: string };
    const selectedValue = terapia.id_terapia;
    
    this.router.navigateByUrl(`/admin/reservar-cita/${selectedValue}`);
  }

  loadCitas(month: number, year: number) {
    if (this.terapiaId) {
      this.citasEvent = this.citasService
        .getByTerapia(this.terapiaId, month, year)
        .pipe(distinctUntilChanged(), map((data) => data.data));
    }
  }

  loadTerapias() {
    this.terapiasService.getAll().subscribe((resp) => {
      this.terapiasList = [
        { id_terapia: '/admin/reservar-cita', nombre: 'Cronograma' },
        ...resp.data.map((t: Terapia) => ({
          id_terapia: t.id_terapia,
          nombre: t.nombre,
        })),
      ];
    });
  }

  loadCurrentTerapia(): void {
    this.terapiasService.getById(this.terapiaId!).subscribe((resp) => {
      this.currentTerapia = resp.data;
    });
  }
}
