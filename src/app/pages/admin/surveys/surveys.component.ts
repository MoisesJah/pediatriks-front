import { Component, inject, OnInit } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { map, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { FichaResultService } from 'src/app/services/ficha-result/ficha-result.service';
import { AgGridModule } from 'ag-grid-angular';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { LoadingService } from 'src/app/services/loading.service';
import { formatDate } from 'src/app/utils/formatDate';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [SurveyModule, HeaderComponent, CommonModule, AgGridModule],
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss',
})
export class SurveysComponent implements OnInit {
  fichasService = inject(FichaResultService);
  fichasList = new Observable();
  theme = inject(ThemeService);
  isLoading = inject(LoadingService).isLoading;

  private gridApi!: GridApi;

  localeText = AG_GRID_LOCALE_ES;

  colDefs: ColDef[] = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      cellClass: 'fw-bold',
      filter: 'agTextColumnFilter',
      minWidth: 250,
    },
    {
      headerName: 'Paciente',
      field: 'paciente',
      filter: true,
      minWidth: 200,
    },
    {
      headerName: 'Personal',
      field: 'personal',
      filter: true,
    },
    {
      headerName: 'Terapia',
      field: 'terapia',
      filter: true,
      cellRenderer: (data: any) => {
        return `<span class="d-flex align-items-center gap-2"><span class="h-5px w-5px rounded-circle" style="background-color: ${data.data.color}"></span>${data.value}</span>`;
      }
    },
    {
      headerName: 'Fecha',
      field: 'fecha_sesion',
      filter: 'agDateColumnFilter',
      valueFormatter: (data: any) => formatDate(data.value),
    },
    {
      headerName: 'Status',
      field: 'status',
      filter: 'agTextColumnFilter',
      cellRenderer: (data: any) => {
        if (data.value === 'pendiente') {
          return `<span class="badge badge-light-warning rounded-pill">${data.value}</span>`;
        } else {
          return `<span class="badge badge-light-success rounded-pill">${data.value}</span>`;
        }
      },
    },
    {
      headerName: 'Fecha Completado',
      field: 'fecha_completado',
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
    {
      headerName: 'Acciones',
      filter: false,
      field: 'id_resultado',
      // cellClass:'my-5',
      autoHeight: true,
      // flex: 2,
      cellRenderer: (data: any) => {
        const url = `/ficha-result/${data.data.id_resultado}`;
        if (data.value) {
          return `<a href="${url}" target="_blank" class="btn btn-light-info btn-sm btn-active-icon-white rounded-pill"><i class="ki-outline ki-eye fs-4"></i>Ver Contenido</a>`;
        }
      },
    },
  ];

  ngOnInit(): void {
    this.getFichas();
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  loadTabla() {
    this.getFichas();
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('terapia-search') as HTMLInputElement).value
    );
  }

  getFichas() {
    this.fichasList = this.fichasService.getList().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }
}
