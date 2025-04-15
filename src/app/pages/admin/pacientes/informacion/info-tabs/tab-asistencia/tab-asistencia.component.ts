import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { StatusBadgeComponent } from 'src/app/pages/terapista/modals/status-badge/status-badge.component';
import { LoadingService } from 'src/app/services/loading.service';
import { ReporteService } from 'src/app/services/paciente/reporte/reporte.service';
import { ThemeService } from 'src/app/services/theme.service';
import { formatDate, longDate } from 'src/app/utils/formatDate';

@UntilDestroy()
@Component({
  selector: 'app-tab-asistencia',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './tab-asistencia.component.html',
})
export class TabAsistenciaComponent implements OnInit {
  reporteService = inject(ReporteService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  id_paciente = inject(ActivatedRoute).snapshot.paramMap.get('id');

  localeText = AG_GRID_LOCALE_ES;

  columnDefs: ColDef[] = [
    {
      field: 'fecha_sesion',
      headerName: 'Fecha',
      filter: 'agDateColumnFilter',
      minWidth: 275,
      cellRenderer: (data: any) => longDate(data.data.fecha_sesion),
    },
    {
      field: 'hora',
      headerName: 'Horario',
      filter: true,
      cellRenderer: (data: any) => {
        return `${data.data.hora_inicio} - ${data.data.hora_fin}`;
      },
    },
    {
      field:'tipo_cita',
      headerName: 'Tipo de Cita',
      filter: true
    },
    { field: 'terapia', headerName: 'Terapia', filter: true },
    { field: 'terapista', headerName: 'Terapista', filter: true },
    {
      field: 'status',
      headerName: 'Status',
      maxWidth:120,
      resizable: false,
      filter: true,
      cellRenderer: StatusBadgeComponent,
    },
  ];

  horariosList = new Observable();

  ngOnInit(): void {
    this.horariosList = this.reporteService
      .getAsistencias(this.id_paciente!)
      .pipe(
        map((resp: any) => resp.data.asistencias),
        untilDestroyed(this)
      );
  }
}
