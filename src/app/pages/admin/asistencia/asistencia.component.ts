import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { map, Observable } from 'rxjs';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ThemeService } from 'src/app/services/theme.service';
import { HeaderComponent } from '../../../components/ui/header/header.component';
import { formatDate } from 'src/app/utils/formatDate';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditStatusComponent } from './modals/edit-status/edit-status.component';
import { UpdateBtnComponent } from './modals/update-btn/update-btn.component';
import { CreateAsistenciaComponent } from './modals/create-asistencia/create-asistencia.component';
import { ActionButtonsComponent } from '../pacientes/modals/action-buttons/action-buttons.component';
import { DeleteAsistenciaComponent } from './modals/delete-asistencia/delete-asistencia.component';

@UntilDestroy()
@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss',
})
export class AsistenciaComponent implements OnInit {
  asistenciaService = inject(AsistenciaService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  modal = inject(NgbModal);

  private gridApi!: GridApi;

  localeText = AG_GRID_LOCALE_ES;

  asistenciaList = new Observable();

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
      field: 'hora_asistencia',
      headerName: 'Hora de Asistencia',
      filter: 'agDateColumnFilter',
    },
    {
      field: 'status.nombre',
      headerName: 'Status',
      filter: true,
      cellRenderer: StatusBadgeComponent,
    },
    {
      field: 'observaciones',
      headerName: 'Notas',
      filter: true,
    },
    {
      headerName: 'Acciones',
      cellRenderer: ActionButtonsComponent,
      cellRendererParams: {
        onEdit: (data: any) => this.openUpdateModal(data),
        onDelete: (data: any) => this.openDeleteModal(data.id),
      },
      maxWidth: 100,
      resizable: false,
    },
  ];

  ngOnInit(): void {
    this.loadAsistencias();
  }

  loadAsistencias() {
    this.asistenciaList = this.asistenciaService.getAll().pipe(
      map((resp: any) => resp.data),
      untilDestroyed(this)
    );
  }

  loadTabla() {
    this.loadAsistencias();
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

  openCreateModal() {
    const modalRef = this.modal.open(CreateAsistenciaComponent, {
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla();
    });
  }

  openUpdateModal(data: any) {
    const modalRef = this.modal.open(EditStatusComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.id_asistencia = data.id;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla();
    });
  }

  openDeleteModal(id_asistencia: number) {
    const modalRef = this.modal.open(DeleteAsistenciaComponent, {
      centered: true,
      size: 'sm',
      backdrop: 'static',
    });

    modalRef.componentInstance.id_asistencia = id_asistencia;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla();
    });
  }
}
