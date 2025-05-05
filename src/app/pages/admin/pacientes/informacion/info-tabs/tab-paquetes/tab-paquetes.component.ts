import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ReporteService } from 'src/app/services/paciente/reporte/reporte.service';
import { ThemeService } from 'src/app/services/theme.service';
import { formatMoney } from 'src/app/utils/formatCurrency';
import { formatDate } from 'src/app/utils/formatDate';
import { SessionProgressComponent } from './session-progress/session-progress.component';

@UntilDestroy()
@Component({
  selector: 'app-tab-paquetes',
  standalone: true,
  imports: [
    AgGridAngular,
    CommonModule,
    NgbAccordionModule,
    NgbProgressbarModule,
  ],
  templateUrl: './tab-paquetes.component.html',
  styleUrl: './tab-paquetes.component.scss',
})
export class TabPaquetesComponent implements OnInit {
  reporteService = inject(ReporteService);
  activatedRoute = inject(ActivatedRoute);
  paquetesLoading = false;
  theme = inject(ThemeService);

  id_paciente = this.activatedRoute.snapshot.paramMap.get('id');

  localeText = AG_GRID_LOCALE_ES;

  historialList = new Observable();
  paquetesList = new Observable();
  historialData = [];

  private historialSubjects = new Map<string, BehaviorSubject<any[]>>();
  private dataLoaded = new Map<string, boolean>();
  private loadingStates = new Map<string, BehaviorSubject<boolean>>();

  columnDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    {
      field: 'precio',
      headerName: 'Precio',
      valueFormatter: (params) => formatMoney(params.value),
      filter: true,
    },
    { field: 'metodo_pago', headerName: 'Método de Pago', filter: true },
    {
      headerName: 'N° Sesiones',
      minWidth: 200,
      filter: false,
      sortable: false,
      cellRenderer: SessionProgressComponent,
    },
    {
      field: 'created_at',
      headerName: 'Fecha Compra',
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
    // this.getHistorial()
    this.getPaquetes();
  }

  getHistorialSubject(id: string): BehaviorSubject<any[]> {
    if (!this.historialSubjects.has(id)) {
      // Create a new BehaviorSubject with empty array initial value
      const subject = new BehaviorSubject<any[]>([]);
      this.historialSubjects.set(id, subject);
    }

    return this.historialSubjects.get(id)!;
  }

  // Method to get or create a loading state for a specific ID
  getLoadingState(id: string): BehaviorSubject<boolean> {
    if (!this.loadingStates.has(id)) {
      // Create a new BehaviorSubject with false initial value (not loading)
      const subject = new BehaviorSubject<boolean>(false);
      this.loadingStates.set(id, subject);
    }
    return this.loadingStates.get(id)!;
  }

  loadHistorialData(id: string, forceRefresh: boolean = false): void {
    this.getLoadingState(id).next(true);

    this.reporteService
      .getPaquetes(this.id_paciente!)
      .pipe(
        map((resp: any) =>
          resp.data.compras.flatMap((compra: any) =>
            compra.historial.filter((item: any) => item.id_paq === id)
          )
        ),
        finalize(() => this.getLoadingState(id).next(false)),
        untilDestroyed(this)
      )
      .subscribe((data) => {
        // Get the BehaviorSubject and update its value
        const subject = this.getHistorialSubject(id);
        subject.next(data);
      });
  }

  getPaquetes() {
    this.paquetesLoading = true;
    this.paquetesList = this.reporteService.getPaquetes(this.id_paciente!).pipe(
      map((resp: any) => resp.data.compras),
      finalize(() => (this.paquetesLoading = false)),
      untilDestroyed(this)
    );
  }
}
