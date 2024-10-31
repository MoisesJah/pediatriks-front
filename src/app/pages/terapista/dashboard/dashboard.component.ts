import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IPaciente } from '.././../../models/paciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

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
  datePipe = inject(DatePipe);
  personalService = inject(PersonalService);

  citas: Observable<Cita[]> = new Observable();
  user = this.authService.user();

  colDefs: ColDef[] = [
    { field: 'title', headerName: 'Paciente', filter: true },
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
        return `<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-time text-gray-900 fs-2"></i>${this.datePipe.transform(new Date(params.value), 'hh:mm')}</span>`;
      },
    },
    {
      field: 'end',
      headerName: 'Hora de Fin',
      filter: true,
      cellRenderer: (params: any) => {
        return `<span class="d-flex gap-2 align-items-center"><i class="ki-outline ki-time text-gray-900 fs-2"></i>${this.datePipe.transform(new Date(params.value), 'hh:mm')}</span>`;
      },
    },
    { field: 'estado', headerName: 'Estado', filter: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private citaService: CitaService
  ) {}

  ngOnInit() {
    // Llamar al método para cargar las citas
    this.loadCitas();
  }

  loadCitas() {

    if(!this.user?.personal){
      console.log('Mostrar aviso que no tiene personal asignado el usuario');
      return;
    }

    // Obtener el id_personal del usuario y convertirlo a string
    const id_personal = this.user?.personal?.id_personal; // Asegúrate de que tu AuthService devuelve el id

    const startWeek = new Date();
    const endWeek = new Date();
    endWeek.setDate(startWeek.getDate() + 7); // Fin de la semana en 7 días

    // Obtener las citas usando el método del servicio de Citas
    if (id_personal) { // Verifica que id_personal no sea null o undefined
      this.citas = this.citaService.getCitasByPersonal({
        id_personal,
        startWeek: startWeek.toISOString(), // Convierte a string
        endWeek: endWeek.toISOString() // Convierte a string
      })
      .pipe(
        map(response => response.data) // Asegúrate de que tu API devuelve un objeto con la propiedad 'data'
      );
    } else {
      console.error('ID personal no disponible');
      this.citas = new Observable(); // Maneja el caso de que no haya ID personal
    }
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.sizeColumnsToFit();
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
