import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { BorrarModalComponent } from './modales/borrar-modal/borrar-modal.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { Personal } from 'src/app/models/personal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ActionButtonsComponent } from './modales/action-buttons/action-buttons.component';
import { map, Observable } from 'rxjs';
import { formatMoney } from 'src/app/utils/formatCurrency';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CvViewerComponent } from './modales/cv-viewer/cv-viewer.component';
import { ThemeService } from 'src/app/services/theme.service';
import { getDayWeek } from 'src/app/utils/getdayWeek';
import { HorariosListComponent } from './modales/horarios-list/horarios-list.component';
import { BtnAtencionesComponent } from './btn-atenciones/btn-atenciones.component';
import { AtencionesPersonalComponent } from './atenciones-personal/atenciones-personal.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  personalService = inject(PersonalService);
  personalList: Observable<Personal[]> = new Observable();
  modal = inject(NgbModal);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  localeText = AG_GRID_LOCALE_ES;
  gridApi!: GridApi;

  colDefs: ColDef[] = [
    {
      field: 'cv_url',
      headerName: 'CV',
      filter: false,
      maxWidth: 70,
      cellRendererSelector: (params) => {
        return params.value
          ? { component: CvViewerComponent, params: params.data.id_personal }
          : undefined;
      },
    },
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'dni', headerName: 'DNI', filter: true, maxWidth: 110 },
    { field: 'telefono', headerName: 'Teléfono', filter: true, maxWidth: 120 },
    { field: 'correo', headerName: 'Correo', filter: true },
    {
      field: 'genero.nombre',
      headerName: 'Género',
      filter: true,
      maxWidth: 110,
    },
    { field: 'sede.nombre', headerName: 'Sede', filter: true },
    {
      field: 'sueldo',
      headerName: 'Sueldo',
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => formatMoney(params.value),
    },
    { field: 'terapia.nombre', headerName: 'Especialidad', filter: true },
    {
      headerName: 'Atenciones',
      cellRenderer: BtnAtencionesComponent,
      cellRendererParams: (data: any) => {
        return {
          openModal: () => this.openAtencionesModal(data.data),
        };
      },
    },
    { field: 'nro_colegiatura', headerName: 'Nro. Colegiatura', filter: true },
    { field: 'direccion', headerName: 'Dirección', filter: true },
    {
      headerName: 'Color',
      field: 'color',
      maxWidth: 75,
      filter: false,
      cellRenderer: (params: any) => {
        return `<div class="h-20px w-20px mt-3 rounded-circle" style="background-color: ${params.value}"></div>`;
      },
    },
    {
      field: 'horarios',
      headerName: 'Horario Semanal',
      filter: false,
      autoHeight: true,
      minWidth: 250,
      valueFormatter: (params) => {
        return params.data.horarios
          .map((h: any) => getDayWeek(h.dia_semana))
          .join(', ');
      },
      cellRenderer: HorariosListComponent,
    },

    {
      headerName: 'Acciones',
      cellRenderer: ActionButtonsComponent,
      cellRendererParams: {
        onEdit: (data: any) => this.openEditarModal(data),
        onDelete: (data: any) => this.openBorrarModal(data),
      },
      maxWidth: 100,
      resizable: false,
    },
  ];

  ngOnInit(): void {
    this.fetchPersonal();
  }

  private fetchPersonal(): void {
    this.personalList = this.personalService
      .getAll()
      .pipe(map((resp) => resp.data));
  }

  loadTabla() {
    this.fetchPersonal();
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // this.sizeColumnsToFit();
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('personal-search') as HTMLInputElement).value
    );
  }

  openCrearModal() {
    const modalRef = this.modal.open(CrearModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPersonal();
    });
  }

  openEditarModal(personal: Personal) {
    const modalRef = this.modal.open(EditarModalComponent, {
      size: '300px',
      animation: true,
    });
    modalRef.componentInstance.personalId = personal.id_personal;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPersonal();
    });
  }

  openBorrarModal(personal: Personal) {
    const modalRef = this.modal.open(BorrarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.personalId = personal.id_personal;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPersonal();
    });
  }

  openAtencionesModal(personal: Personal) {
    const modalRef = this.modal.open(AtencionesPersonalComponent, {
      size: 'xl',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.id_personal = personal.id_personal;
    console.log(personal);
  }
}
