import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { ThemeService } from 'src/app/services/theme.service';
import { formatDate } from 'src/app/utils/formatDate';

@UntilDestroy()
@Component({
  selector: 'app-info-atenciones',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './info-atenciones.component.html',
})
export class InfoAtencionesComponent {
  personalService = inject(PersonalService);
  router = inject(ActivatedRoute);
  isLoading = inject(LoadingService).isLoading;
  atencionesList = new Observable();
  theme = inject(ThemeService);

  id_personal = this.router.snapshot.params['id'];

  localeText = AG_GRID_LOCALE_ES;
  gridApi!: GridApi;

  colDefs: ColDef[] = [
    {
      field: 'fecha',
      headerName: 'Fecha',
      valueFormatter: (params) => formatDate(params.value),
      filter: 'agDateColumnFilter',
    },
    {
      field: 'hora',
      headerName: 'Horario',
    },
    {
      field: 'tipocita.nombre',
      headerName: 'Tipo de cita',
    },
    {
      field: 'paciente.nombre',
      headerName: 'Paciente',
      minWidth: 275,
    }
  ];

  ngOnInit(): void {
    this.getLista();
  }

  getLista() {
    this.atencionesList = this.personalService
      .getAtenciones({ id_personal: this.id_personal })
      .pipe(
        map((res: any) => res.data.atenciones),
        untilDestroyed(this)
      );
  }
}
