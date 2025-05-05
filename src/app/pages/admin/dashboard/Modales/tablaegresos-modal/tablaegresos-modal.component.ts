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
import { formatMoney } from 'src/app/utils/formatCurrency';

@Component({
  selector: 'app-tablaegresos-modal',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './tablaegresos-modal.component.html',
  styleUrls: ['./tablaegresos-modal.component.scss'],
})
export class TablaegresosModalComponent implements OnInit, OnDestroy {
  private reportesService = inject(ReportesService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  modal = inject(NgbModal);
  localeText = AG_GRID_LOCALE_ES;
  gridApi!: GridApi; // Asegúrate de que el GridApi está inicializado correctamente

  // Lista observable de reportes para la tabla
  reportesList: Observable<any[]> = new Observable();

  // Columnas de la tabla
  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    {
      field: 'monto',
      headerName: 'Egresos',
      valueFormatter: (params) => formatMoney(params.value),
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'created_at',
      headerName: 'Fecha',
      filter: 'agDateColumnFilter',
      cellRenderer: (data: any) => new Date(data.value).toLocaleDateString(),
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      cellStyle: { 'white-space': 'normal' },
      minWidth: 350,
      wrapText: true,
      autoHeight: true,
      filter: true,
    },
    { field: 'metodo_pago', headerName: 'Método de Pago', filter: true },
    { field: 'tipo_egreso', headerName: 'Tipo de Egreso', filter: true },
  ];

  ngOnInit(): void {
    this.loadTabla();
  }

  private fetchReportes() {
    this.reportesList = this.reportesService
      .getReportes('egresos')
      .pipe(map((resp) => resp));
  }

  // Método que carga los reportes en la tabla
  loadTabla() {
    this.fetchReportes();
  }

  close() {
    this.modal.dismissAll();
  }

  // Este evento se dispara cuando la cuadrícula se ha inicializado
  gridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    //  this.gridApi.sizeColumnsToFit();
  }

  ngOnDestroy(): void {
    // Limpiar las suscripciones si es necesario
  }
}
