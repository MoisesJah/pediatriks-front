import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridModule } from 'ag-grid-angular';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { HeaderComponent } from '../../../components/ui/header/header.component';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { LoadingService } from 'src/app/services/loading.service';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { formatMoney } from 'src/app/utils/formatCurrency';
import { ActionButtonsComponent } from '../../admin/terapias/modals/action-buttons/action-buttons.component';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-fichas',
  standalone: true,
  imports: [AgGridModule, CommonModule, HeaderComponent],
  templateUrl: './fichas.component.html',
  styleUrl: './fichas.component.scss',
})
export class FichasComponent implements OnInit {
  authService = inject(AuthService);
  fichasService = inject(FichasService);
  theme = inject(ThemeService);

  fichasList = new Observable<any[]>();
  isLoading = inject(LoadingService).isLoading;

  private gridApi!: GridApi;

  localeText = AG_GRID_LOCALE_ES;

  colDefs: ColDef[] = [
    {
      headerName: 'Nombre',
      field: 'nombre',
    },
    {
      headerName: 'Status',
      field: 'status',
      
    },
    {
      headerName: 'Paciente',
      field: 'paciente.nombre',
    },
  ];

  ngOnInit(): void {
    this.getFichas();
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('terapia-search') as HTMLInputElement).value
    );
  }

  getFichas() {
    this.fichasList = this.fichasService
      .getByPersonal(this.authService.user()?.personal?.id_personal!)
      .pipe(
        map((resp) => resp.data),
        untilDestroyed(this)
      );
  }

  loadTabla() {
    this.getFichas();
  }
}
