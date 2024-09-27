import { IPaciente } from './../../models/paciente';
import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    { field: 'paciente.nombre', headerName: 'Paciente', filter: true },
    { field: 'tipocita.nombre', headerName: 'Terapia', filter: true },
    { field: 'sede.nombre', headerName: 'Sede', filter: true },
    { field: 'fecha', headerName: 'Fecha de Cita', filter: true },
    { field: 'hora', headerName: 'Hora de Cita', filter: true },
    { field: 'terapias.sesiones[0].status', headerName: 'Estado de Sesión', filter: true },
    { field: 'terapias.sesiones[0].personal.nombre', headerName: 'Terapista', filter: true },
    { field: 'estado', headerName: 'Estado', filter: true },
  ];


  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private citaService: CitaService
  ) {}

  ngOnInit() {
    if (this.user) {
      console.log('Usuario autenticado:', this.user);
      const userId = this.user.id.toString();
      this.loadCitasPaciente(userId);
    } else {
      console.error('No se ha encontrado un usuario autenticado');
    }
  }

  loadPacientes() {
    this.pacientesList = this.pacienteService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadCitasPaciente(idPaciente: string) {
    this.citasPaciente = this.citaService.getCitasByUser(idPaciente).pipe(
      map((resp: { data: Cita[] }) => {
        console.log('Datos de citas recibidos:', resp.data); 
        return resp.data;
      }),
      untilDestroyed(this)
    );
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
