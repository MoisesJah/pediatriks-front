import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { Terapia } from 'src/app/models/terapia';
import { LoadingService } from 'src/app/services/loading.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { ThemeService } from 'src/app/services/theme.service';
import { formatDate } from 'src/app/utils/formatDate';

@UntilDestroy()
@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './lista-pacientes.component.html',
})
export class ListaPacientesComponent {
  terapiaService = inject(TerapiaService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  modal = inject(NgbModal);
  id_terapia = '';

  private gridApi!: GridApi;

  pacientesList: Observable<Terapia[]> = new Observable();
  localeText = AG_GRID_LOCALE_ES;

  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'dni', headerName: 'DNI', filter: true, resizable: true },
    {
      field: 'fecha_nacimiento',
      headerName: 'Fecha Nacimiento',
      valueFormatter: (params) => formatDate(params.value),
      filter: 'agDateColumnFilter',
      resizable: true,
    },
  ];

  ngOnInit(): void {
    this.fetchPacientes();
  }

  fetchPacientes() {
    this.pacientesList = this.terapiaService
      .getPacientesByTerapia(this.id_terapia)
      .pipe(
        map((resp: any) => resp.data),
        untilDestroyed(this)
      );
  }

  getLista() {
    this.fetchPacientes();
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('terapia-search') as HTMLInputElement).value
    );
  }

  close() {
    this.modal.dismissAll();
  }
}
