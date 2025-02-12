import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { SolicitudInventarioService } from 'src/app/services/solicitud-inventario/solicitud-inventarioservice';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-stock-terapistas',
  standalone: true,
  imports: [AgGridModule, CommonModule],
  templateUrl: './stock-terapistas.component.html',
  // styleUrl: './stock-terapistas.component.scss'
})
export class StockTerapistasComponent implements OnInit {
  solicitudService = inject(SolicitudInventarioService);
  stockTerapistas: Observable<any> = new Observable();
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  localeText = AG_GRID_LOCALE_ES;

  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Terapista', filter: true, cellClass: 'fw-bold' },
    { field: 'terapia', headerName: 'Terapia', filter: true },
    { field: 'item', headerName: 'Item', filter: 'agNumberColumnFilter', cellClass: 'fw-bold' },
    {
      field: 'stock',
      headerName: 'Stock Actual',
      filter: 'agNumberColumnFilter',
    },
  ];

  ngOnInit(): void {
    this.fecthSolicitudes();
  }

  fecthSolicitudes() {
    this.stockTerapistas = this.solicitudService
      .stockTerapista({})
      .pipe(map((res) => res.data));
  }
}
