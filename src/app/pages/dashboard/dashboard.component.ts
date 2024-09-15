import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { map, Observable, take } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { IPaciente } from 'src/app/models/paciente';


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
  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombres', filter: true },
    { field: 'dni', headerName: 'DNI', filter: true },
    { field: 'genero.nombre', headerName: 'Género' },
    {
      field: 'fecha_nacimiento',
      headerName: 'Fecha Nacimiento',
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en'),
    },
    { field: 'user.name', headerName: 'Padre de familia', filter: true },
    { field: 'direccion', headerName: 'Dirección', filter: true },
    { field: 'colegio', headerName: 'Colegio', filter: true },
  ];


  constructor(
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router
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

  handleSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue) {
      // Implementa la lógica que desees para cuando se seleccione un paciente
      this.router.navigate([selectedValue], { relativeTo: this.route });
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
    handleResize(); // Llamada inicial
  }
}
