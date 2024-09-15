import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { map, Observable, take } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { IPaciente } from 'src/app/models/paciente';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/citas/cita.service';
import { LoadingService } from 'src/app/services/loading.service';


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
  pacienteService = inject(PacienteService);
  pacientesList: Observable<IPaciente[]> = new Observable();
  citasPaciente: Observable<Cita[]> = new Observable(); // Observable para las citas del paciente seleccionado
  selectedPacienteId: string | null = null; // Almacena el ID del paciente seleccionado

  colDefs: ColDef[] = [
    { field: 'paciente.nombre', headerName: 'Paciente', filter: true },
    //{ field: 'sesion.fecha_inicio', headerName: 'Fecha Inicio', filter: true, valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en') },
    //{ field: 'sesion.hora_inicio', headerName: 'Hora Inicio', filter: true },
    //{ field: 'sesion.hora_fin', headerName: 'Hora Fin', filter: true },
    { field: 'terapia.nombre', headerName: 'Terapia', filter: true },
    { field: 'sede.nombre', headerName: 'Sede', filter: true },
  ];


  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private citaService: CitaService
  ) {}

  ngOnInit() {
    this.loadPacientes();
  }

  loadPacientes() {
    this.pacientesList = this.pacienteService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  // Cargar citas del paciente seleccionado
  loadCitasPaciente(idPaciente: string) {
    this.citasPaciente = this.citaService.getCitasByPaciente(idPaciente).pipe(
      map((resp: { data: Cita[] }) => resp.data), // Tipar la respuesta correctamente
      untilDestroyed(this)
    );
  }

  handleSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue) {
      // Busca el paciente seleccionado en la lista de pacientes
      this.pacientesList.pipe(take(1)).subscribe((pacientes) => {
        const pacienteSeleccionado = pacientes.find(p => p.id_paciente === selectedValue);

        if (pacienteSeleccionado) {
          // Cargar citas del paciente seleccionado
          this.loadCitasPaciente(pacienteSeleccionado.id_paciente);

          // Luego, establece los datos en el grid
          this.citasPaciente.pipe(take(1)).subscribe((citas) => {
            this.gridApi.applyTransaction({ add: citas });
          });
        }
      });
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
