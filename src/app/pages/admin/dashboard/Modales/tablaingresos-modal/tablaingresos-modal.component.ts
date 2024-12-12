import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportesService } from 'src/app/services/reportes/reportes.service';

@Component({
  selector: 'app-tablaingresos-modal',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './tablaingresos-modal.component.html',
  styleUrls: ['./tablaingresos-modal.component.scss'],
})
export class TablaingresosModalComponent implements OnInit, OnDestroy {
  private reportesService = inject(ReportesService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  modal = inject(NgbModal);
  localeText = AG_GRID_LOCALE_ES;
  gridApi!: GridApi;

  // Lista observable de reportes
  reportesList: Observable<any[]> = new Observable();

  // Columnas de la tabla
  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'ingresos', headerName: 'Ingresos', filter: true },
    { field: 'descripcion', headerName: 'Descripción', filter: true },
    {
      field: 'created_at',
      headerName: 'Fecha',
      filter: true,
      cellRenderer: (data: any) => new Date(data.value).toLocaleDateString(),
    },
  ];

  ngOnInit(): void {
    this.loadTabla();
  }

  private fetchReportes() {
    this.reportesList = this.reportesService.getReportes().pipe(
      map((resp) => resp)
    );
  }

  loadTabla() {
    this.fetchReportes();
  }

  close() {
    this.modal.dismissAll();
  }

  gridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridApi.sizeColumnsToFit();
  }

  ngOnDestroy(): void {
    // Limpieza si es necesario
  }
}
