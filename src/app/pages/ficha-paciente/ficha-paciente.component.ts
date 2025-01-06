import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { AuthService } from 'src/app/services/auth.service';
import { FichaResultService } from 'src/app/services/ficha-result/ficha-result.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ThemeService } from 'src/app/services/theme.service';
import { formatDate } from 'src/app/utils/formatDate';

@UntilDestroy()
@Component({
  selector: 'app-ficha-paciente',
  standalone: true,
  imports: [AgGridModule, CommonModule, HeaderComponent],
  templateUrl: './ficha-paciente.component.html',
  styleUrl: './ficha-paciente.component.scss',
})
export class FichaPacienteComponent implements OnInit {
  authService = inject(AuthService);
  fichaService = inject(FichaResultService);

  fichasList = new Observable<any[]>();
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
    },
    {
      headerName: 'Fecha',
      field: 'fecha_sesion',
      filter: 'agDateColumnFilter',
      valueFormatter: (data: any) => formatDate(data.value),
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
    this.fichasList = this.fichaService.getByPacientes(this.authService.user()?.id!).pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }
}
