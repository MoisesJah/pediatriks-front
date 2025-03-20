import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ReporteService } from 'src/app/services/paciente/reporte/reporte.service';
import { ThemeService } from 'src/app/services/theme.service';
import { formatDate } from 'src/app/utils/formatDate';

@UntilDestroy()
@Component({
  selector: 'app-tab-informes',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './tab-informes.component.html',
})
export class TabInformesComponent implements OnInit {
  reporteService = inject(ReporteService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  id_paciente = inject(ActivatedRoute).snapshot.paramMap.get('id');

  localeText = AG_GRID_LOCALE_ES;

  columnDefs: ColDef[] = [
    { field: 'ficha', headerName: 'Nombre', filter: true, minWidth: 350, cellClass: 'fw-bold' },
    {
      field: 'fecha_sesion',
      headerName: 'Fecha',
      filter: 'agDateColumnFilter',
      cellRenderer: (data: any) => formatDate(data.data.fecha_sesion),
    },
    {
      field: 'hora',
      headerName: 'Horario',
      filter: true,
      cellRenderer: (data: any) => {
        return `${data.data.hora_inicio} - ${data.data.hora_fin}`;
      },
    },
    { field: 'terapia', headerName: 'Terapia', filter: true },
    { field: 'terapista', headerName: 'Terapista', filter: true },
    {
      headerName: 'Acciones',
      filter: false,
      field: 'id_result',
      // cellClass:'my-5',
      autoHeight: true,
      // flex: 2,
      cellRenderer: (data: any) => {
        const url = `/ficha-result/${data.data.id_result}`;
        if (data.value) {
          return `<a href="${url}" target="_blank" class="btn btn-light-info btn-sm btn-active-icon-white rounded-pill"><i class="ki-outline ki-eye fs-4"></i>Ver Contenido</a>`;
        }
      },
    },
  ];

  informesList = new Observable();

  ngOnInit(): void {
    this.informesList = this.reporteService.getFichas(this.id_paciente!).pipe(
      map((resp: any) => resp.data.informes),
      untilDestroyed(this)
    );
  }

}
