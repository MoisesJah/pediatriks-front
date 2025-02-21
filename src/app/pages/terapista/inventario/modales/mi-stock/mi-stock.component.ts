import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SolicitudInventarioService } from 'src/app/services/solicitud-inventario/solicitud-inventarioservice';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-mi-stock',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './mi-stock.component.html',
  styleUrl: './mi-stock.component.scss',
})
export class MiStockComponent implements OnInit {
  modal = inject(NgbModal);
  solicitudService = inject(SolicitudInventarioService);
  auth = inject(AuthService);
  theme = inject(ThemeService);
  isLoading = inject(LoadingService).isLoading;

  stockTerapista: Observable<any> = new Observable();

  localeText = AG_GRID_LOCALE_ES;

  colDefs: ColDef[] = [
    { field: 'item', headerName: 'Item', filter: true },
    { field: 'stock', headerName: 'Stock', filter: 'agNumberColumnFilter' },
    {
      field: 'created_at',
      headerName: 'Última Solictud Aprobada',
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          const dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = dateAsString.slice(0, 10).split('/');
          const year = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const day = Number(dateParts[0]);
          const cellDate = new Date(year, month, day);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
      cellClass: 'fw-semibold text-gray-600 text-center',
    },
  ];

  ngOnInit(): void {
    this.getStock();
  }

  getStock() {
    this.stockTerapista = this.solicitudService
      .stockTerapista({ id_personal: this.auth.user()?.personal?.id_personal! })
      .pipe(
        map((resp) => resp.data),
        untilDestroyed(this)
      );
  }

  close() {
    this.modal.dismissAll();
  }
}
