import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { IPaciente } from 'src/app/models/paciente';
import { LoadingService } from 'src/app/services/loading.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { CreateModalComponent } from './modals/create-modal/create-modal.component';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { map, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { ActionButtonsComponent } from './modals/action-buttons/action-buttons.component';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { BtnLinkInfoComponent } from './modals/btn-link-info/btn-link-info.component';

@UntilDestroy()
@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss',
})
export class PacientesComponent implements OnInit {
  modal = inject(NgbModal);
  pacienteService = inject(PacienteService);
  theme = inject(ThemeService);
  isLoading = inject(LoadingService).isLoading;
  localeText = AG_GRID_LOCALE_ES;

  pacientesList: Observable<IPaciente[]> = new Observable();
  private gridApi!: GridApi;

  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombres', filter: true },
    { field: 'dni', headerName: 'DNI', filter: true },
    { field: 'genero.nombre', headerName: 'Género' },
    {
      field: 'fecha_nacimiento',
      headerName: 'Fecha Nacimiento',
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en'),
    },
    { field: 'diagnostico', headerName: 'Diagnóstico', filter: true },
    { field: 'user.name', headerName: 'Apoderado', filter: true },
    { field: 'parentesco.nombre', headerName: 'Parentesco', filter: true },
    { field: 'colegio', headerName: 'Colegio', filter: true },
    {
      headerName: 'Informes',
      cellRenderer: BtnLinkInfoComponent
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

  ngOnInit(): void {
    this.fetchPacientes();
  }

  private fetchPacientes() {
    this.pacientesList = this.pacienteService.getAll().pipe(
      untilDestroyed(this),
      map((resp) => {
        return resp.data || [];
      })
    );
  }

  loadTabla() {
    this.fetchPacientes();
  }

  openCreateModal() {
    const modalRef = this.modal.open(CreateModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPacientes();
    });
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('paciente-search') as HTMLInputElement).value
    );
  }

  openEditModal(paciente: IPaciente) {
    const modalRef = this.modal.open(EditModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.paciente = paciente;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPacientes();
    });
  }

  openDeleteModal(paciente: IPaciente) {
    const modalRef = this.modal.open(DeleteModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.pacienteId = paciente.id_paciente;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPacientes();
    });
  }

  close() {
    this.modal.dismissAll();
  }
}
