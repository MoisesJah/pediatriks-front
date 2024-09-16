import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { combineLatest, distinctUntilChanged, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
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
  terapiasList: Observable<{ id_terapia: string; nombre: string }[]> = new Observable();

  currentTerapia: Terapia | undefined;
  loading: boolean = true;

  gridMonth = new Date().getMonth() + 1;
  gridYear = new Date().getFullYear();

  constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {}

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
    eventClick: this.handleEventClick.bind(this),
    loading:(isLoading) => {
        this.loading = isLoading;
    },
    locale: esLocale,
    datesSet: (arg) => {
      this.changeDetector.detectChanges();
      this.gridMonth = arg.view.currentStart.getMonth() + 1;
      this.gridYear = arg.view.currentStart.getFullYear();
      this.loadCitas(this.gridMonth, this.gridYear);
    },
  };

  ngOnInit(): void {
    this.route.params.pipe(
      tap(({ tag }) => (this.terapiaId = tag)),
      switchMap(() => combineLatest([this.loadCurrentTerapia(), this.loadTerapias()])),
    ).subscribe(() => this.loadCitas(this.gridMonth, this.gridYear));
    // this.loadTerapias();
    // this.loadCurrentTerapia()
  }

  openModal() {
    const modalRef = this.modalService.open(CrearModalComponent, {
      size: 'lg',
      centered: true,
      // backdrop: 'static',
    });
    modalRef.componentInstance.terapia = this.currentTerapia;
    modalRef.componentInstance.eventSubmitted.subscribe(() => {
      this.loadCitas(this.gridMonth, this.gridYear);
    })
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
    modalRef.componentInstance.citaId = event.extendedProps.id_cita;
    modalRef.componentInstance.eventUpdated.subscribe(() => {
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
        .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)), map((resp) => resp.data));
    }
  }

  loadTerapias() {
    return this.terapiasList = this.terapiasService.getAll().pipe(
      map((resp) => [
        { id_terapia: '/admin/reservar-cita', nombre: 'Cronograma' },
        ...resp.data.map((t: Terapia) => ({
          id_terapia: t.id_terapia,
          nombre: t.nombre,
        })),
      ]),
    )
  }

  loadCurrentTerapia() {
    return this.terapiasService.getById(this.terapiaId!).pipe(
      tap((resp) => (this.currentTerapia = resp.data)),
    );
  }
}
