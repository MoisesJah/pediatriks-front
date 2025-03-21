import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { PermisoPersonalService } from 'src/app/services/asistencia/permisos/permiso-personal.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ThemeService } from 'src/app/services/theme.service';
import { formatDate } from 'src/app/utils/formatDate';
import { UpdateBtnComponent } from '../modals/update-btn/update-btn.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@UntilDestroy()
@Component({
  selector: 'app-tabla-permisos',
  standalone: true,
  imports: [AgGridAngular,CommonModule],
  templateUrl: './tabla-permisos.component.html',
})
export class TablaPermisosComponent implements OnInit {
  permisoService = inject(PermisoPersonalService);
  modal = inject(NgbModal);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  ngOnInit(): void {
    this.loadPermisos();
  }

  private gridApi!: GridApi;

  localeText = AG_GRID_LOCALE_ES;

  permisosList = new Observable();

  colDefs: ColDef[] = [
    { field: 'personal.nombre', headerName: 'Terapista', filter: true },
    { field: 'personal.terapia.nombre', headerName: 'Terapia', filter: true },
    {
      field: 'fecha',
      headerName: 'Fecha',
      filter: 'agDateColumnFilter',
      valueFormatter: (data: any) => formatDate(data.value),
    },
    {
      field: 'status.nombre',
      headerName: 'Tipo de Permiso',
      filter: true,
    },
    {
      field: 'observaciones',
      headerName: 'Notas',
      filter: true,
    },
    // {
    //   headerName: 'Acciones',
    //   cellRendererParams: (params: any) => {
    //     return {
    //       openModal: () => this.openUpdateModal(params.data.id_asistencia),
    //     };
    //   },
    //   cellRenderer: UpdateBtnComponent,
    //   resizable: false,
    //   maxWidth: 200,
    // },
  ];


  loadPermisos() {
    this.permisosList = this.permisoService.getAll().pipe(
      map((resp: any) => resp.data),
      untilDestroyed(this)
    );
  }

  loadTabla() {
    this.loadPermisos();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('asistencia-search') as HTMLInputElement).value
    );
  }


  close(){
    this.modal.dismissAll();
  }

  openCreateModal() {
    this.modal.open(UpdateBtnComponent, { size: 'xl' });
  }
}
