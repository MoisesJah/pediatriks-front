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
import { CreateComponent } from './modals/create/create.component';
import { ActionButtonsComponent } from '../../terapias/modals/action-buttons/action-buttons.component';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-tabla-permisos',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
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
      field: 'fecha_inicio',
      headerName: 'Fecha Inicio',
      filter: 'agDateColumnFilter',
      valueFormatter: (data: any) => formatDate(data.value),
    },
    {
      field: 'fecha_fin',
      headerName: 'Fecha Fin',
      filter: 'agDateColumnFilter',
      valueFormatter: (data: any) => formatDate(data.value),
    },
    {
      field: 'permiso.nombre',
      headerName: 'Tipo de Permiso',
      minWidth: 250,
      cellRenderer: (data: any) => {
        return `<span class="badge badge-light-primary rounded-pill fs-7">${data.data.permiso.nombre}</span>`;
      },
      filter: true,
    },
    {
      field: 'notas',
      headerName: 'Observaciones',
      wrapText: false,
      filter: true,
    },
    {
      headerName: 'Acciones',
      cellRenderer: ActionButtonsComponent,
      cellRendererParams: {
        onEdit: (data: any) => this.openEditModal(data),
        onDelete: (data: any) => this.openDeleteModal(data),
      },
      maxWidth: 100,
      resizable: false,
    },
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

  close() {
    this.modal.dismissAll();
  }

  openCreateModal() {
    const modalRef = this.modal.open(CreateComponent, {
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla();
    });
  }

  openDeleteModal(data: any) {
    const modalRef = this.modal.open(DeleteModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.permisoId = data.id;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla();
    });
  }

  openEditModal(data: any) {
    const modalRef = this.modal.open(EditModalComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.permisoId = data.id;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla();
    });
  }
}
