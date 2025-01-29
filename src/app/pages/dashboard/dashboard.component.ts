import { IPaciente } from './../../models/paciente';
import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { StatusBadgeComponent } from '../terapista/modals/status-badge/status-badge.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderComponent, RouterOutlet, AgGridAngular],
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

  pacienteService = inject(PacienteService);
  pacientesList: Observable<IPaciente[]> = new Observable();
  citasPaciente: Observable<Cita[]> = new Observable();
  user = this.authService.user();

  colDefs: ColDef[] = [
    { field: 'paciente', headerName: 'Paciente', filter: true },
    { field: 'tipocita', headerName: 'Tipo de Cita', filter: true },
    { field: 'sede', headerName: 'Sede', filter: true },
    {
      field: 'fecha_sesion',
      headerName: 'Fecha de Cita',
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en'),
      cellRenderer: (params: any) => {
        return `<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-calendar text-gray-900 fs-2"></i>${params.valueFormatted}</span>`;
      },
      filter: 'agDateColumnFilter',
    },
    {
      field: 'hora_inicio',
      headerName: 'Hora de Cita',
      filter: true,
      cellRenderer: (params: any) => {
        return `<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-time text-gray-900 fs-2"></i>${params.value}</span>`;
      },
    },
    { field: 'terapia', headerName: 'Terapia', filter: true },
    { field: 'terapista', headerName: 'Terapista', filter: true },
    {
      field: 'status',
      headerName: 'Estado',
      filter: true,
      cellRenderer: StatusBadgeComponent,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private citaService: CitaService
  ) {}

  ngOnInit() {
    if (this.user) {
      console.log('Usuario logueado:', this.user); // Asegúrate de que tenga el ID
      const userId = this.user.id.toString();
      this.loadCitasPaciente(userId);
    }
  }

  loadPacientes() {
    this.pacientesList = this.pacienteService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  refreshList() {
    this.loadCitasPaciente(this.user?.id.toString()!);
  }

  loadCitasPaciente(idPaciente: string) {
    this.citasPaciente = this.citaService.getCitasByUser(idPaciente).pipe(
      map((resp: { data: Cita[] }) => resp.data),
      untilDestroyed(this)
    );
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
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
