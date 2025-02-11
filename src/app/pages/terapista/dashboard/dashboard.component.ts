import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { catchError, of, map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IPaciente } from '.././../../models/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { StatusBadgeComponent } from '../modals/status-badge/status-badge.component';
import flatpickr from 'flatpickr';
import { BaseOptions } from 'flatpickr/dist/types/options';
import { getWeekStartEndDates } from 'src/app/utils/getdatesFromWeek';
import { ConfirmAsistioComponent } from '../modals/confirm-asistio/confirm-asistio.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BtnAssitsComponent } from '../modals/btn-assits/btn-assits.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private gridApi!: GridApi;
  localeText = AG_GRID_LOCALE_ES;
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  authService = inject(AuthService);
  modal = inject(NgbModal);
  datePipe = inject(DatePipe);
  personalService = inject(PersonalService);

  citas: Observable<any[]> = new Observable();
  user = this.authService.user();

  startWeek = getWeekStartEndDates().startOfWeek;
  endWeek = getWeekStartEndDates().endOfWeek;

  public autoSizeStrategy = {
    type: 'fitCellContents',
  };

  colDefs: ColDef[] = [
    { field: 'title', headerName: 'Paciente', filter: true, minWidth: 250 },
    { field: 'tipocita', headerName: 'Tipo de Cita', filter: true },
    {
      field: 'date',
      headerName: 'Fecha de Cita',
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en'),
      cellRenderer: (params: any) => {
        return `<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-calendar text-gray-900 fs-2"></i>${params.value}</span>`;
      },
      filter: 'agDateColumnFilter',
    },
    {
      field: 'start',
      headerName: 'Hora de Inicio',
      filter: true,
      cellRenderer: (params: any) => {
        return `<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-time text-gray-900 fs-2"></i>${this.datePipe.transform(
          new Date(params.value),
          'hh:mm'
        )}</span>`;
      },
    },
    {
      field: 'end',
      headerName: 'Hora de Fin',
      filter: true,
      cellRenderer: (params: any) => {
        return `<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-time text-gray-900 fs-2"></i>${this.datePipe.transform(
          new Date(params.value),
          'hh:mm'
        )}</span>`;
      },
    },
    {
      field: 'estado',
      headerName: 'Estado',
      filter: true,
      cellRenderer: StatusBadgeComponent,
    },
    {
      field: 'id',
      headerName: 'Asistencia',
      filter: false,
      resizable: false,
      cellRenderer: BtnAssitsComponent,
      cellRendererParams: {
        openModal: (params:any) => this.openConfirmModal(params),
      },
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private citaService: CitaService
  ) {}

  ngOnInit() {
    // Inicializar el flatpickr para seleccionar el rango de fechas
    flatpickr('#dateRangePicker', {
      mode: 'range',
      dateFormat: 'Y-m-d',
      onClose: (selectedDates) => {
        if (selectedDates.length === 2) {
          const [startDate, endDate] = selectedDates;
          this.startWeek = startDate
          this.endWeek = endDate

          this.loadCitas()
         
        }
      },
    });

    // Llamar al método para cargar las citas
    this.loadCitas();
  }

  openConfirmModal(id_cita: string) {
    const modalRef = this.modal.open(ConfirmAsistioComponent, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.id_sesion = id_cita

    modalRef.componentInstance.citaUpdated.subscribe(() => {
      this.loadCitas();
    })
  }

  filtrarCitasPorFechas(fechaInicio: string, fechaFin: string) {
    const id_personal = this.user?.personal?.id_personal; // Asegúrate de que este campo esté disponible

    if (!id_personal) {
      return;
    }

    this.citas = this.citaService
      .getCitasByFecha(id_personal, fechaInicio, fechaFin)
      .pipe(
        map((response) => {
          return response.data; // Verifica que 'data' sea un arreglo
        }),
        catchError((error) => {
          return of([]); // Devuelve un array vacío si hay error
        }),
        untilDestroyed(this)
      );
  }

  loadCitas() {
    if (!this.user?.personal) {
      return;
    }

    const id_personal = this.user?.personal?.id_personal;

    if (id_personal) {
      this.citas = this.citaService
        .getCitasByPersonal({
          id_personal,
          startWeek: this.startWeek.toISOString(),
          endWeek: this.endWeek.toISOString()
        })
        .pipe(
          map((response) => {
            return response.data; // Verifica que 'data' sea un arreglo
          }),
          catchError((error) => {
            return of([]); // Devuelve un array vacío si hay error
          }),
          untilDestroyed(this)
        );
    } else {
      this.citas = of([]); // Devuelve un observable con un array vacío
    }
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // this.sizeColumnsToFit();
  }

  sizeColumnsToFit(): void {
    const handleResize = () => this.gridApi.sizeColumnsToFit();
    const resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth >= 768) {
        handleResize();
      }
    });

    resizeObserver.observe(document.body);
    handleResize();
  }
}
