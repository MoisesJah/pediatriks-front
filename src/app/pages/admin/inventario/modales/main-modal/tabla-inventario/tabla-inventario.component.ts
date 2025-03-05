import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudInventarioService } from 'src/app/services/solicitud-inventario/solicitud-inventarioservice';


@Component({
  selector: 'app-tabla-inventario',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './tabla-inventario.component.html',
  styleUrls: ['./tabla-inventario.component.scss'],
})
export class TablaInventarioComponent implements OnInit, OnDestroy {
  private solicitudInventarioService = inject(SolicitudInventarioService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  modal = inject(NgbModal);
  localeText = AG_GRID_LOCALE_ES;
  gridApi!: GridApi;


  solicitudesList: Observable<any[]> = new Observable();


  colDefs: ColDef[] = [
    { field: 'personal_solicita.nombre', headerName: 'Terapista', filter: true },
    { field: 'terapia.nombre', headerName: 'Terapia', filter: true },
    { field: 'item.nombre', headerName: 'Item', filter: true },
    { field: 'cantidad', headerName: 'Cantidad', filter: true },
    {
      field: 'fecha_solicitud',
      headerName: 'Fecha',
      filter: true,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('es-ES');
      }
    },
    { field: 'estado.nombre', headerName: 'Estado', filter: true,
      cellRenderer: (params: any) => {
        const estado = params.value;
        switch (estado) {
          case 'aceptado':
            return '<span class="badge badge-lg badge-light-success">' + estado + '</span>';
          case 'negado':
            return '<span class="badge badge-lg badge-light-danger">' + estado + '</span>';
          case 'pendiente':
            return '<span class="badge badge-lg badge-light-warning">' + estado + '</span>';
        }
      }
     }
  ];


  ngOnInit(): void {
    this.loadTabla();
  }


  private fetchSolicitudes() {
    this.solicitudesList = this.solicitudInventarioService.cargarTodasLasSolicitudes().pipe(
      map((resp) => resp.data)
    );
  }

  // Método que carga las solicitudes en la tabla
  loadTabla() {
    this.fetchSolicitudes();
  }

  close() {
    this.modal.dismissAll();
  }

  // Este evento se dispara cuando la cuadrícula se ha inicializado
  gridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
  }

  ngOnDestroy(): void {
    // Limpiar las suscripciones si es necesario
  }
}
