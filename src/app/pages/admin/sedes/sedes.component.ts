import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Sede } from 'src/app/models/sede';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { BorrarModalComponent } from './modales/borrar-modal/borrar-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ActionButtonsComponent } from './modales/action-buttons/action-buttons.component';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';

@UntilDestroy()
@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss'],
})
export class SedesComponent implements OnInit, OnDestroy {
  sedesService = inject(SedesService);
  isLoading = inject(LoadingService).isLoading;
  modal = inject(NgbModal);
  localeText = AG_GRID_LOCALE_ES;

  sedesList: Observable<Sede[]> = new Observable();

  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'direccion', headerName: 'Dirección', filter: true },
    { field: 'distrito', headerName: 'Distrito', filter: true },
    { field: 'provincia', headerName: 'Provincia', filter: true },
    { field: 'departamento', headerName: 'Departamento', filter: true },
    { field: 'telefono', headerName: 'Telefono', filter: true },
    { field: 'email', headerName: 'Correo', filter: true },
    { field: 'horarioapertura', headerName: 'Hora de Apertura' },
    { field: 'horariocierre', headerName: 'Hora de Cierre' },
    {
      field: 'capacidadpacientes',
      headerName: 'Capacidad de Pacientes',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'numeroconsultorios',
      headerName: 'Número de Consultorios',
      filter: 'agNumberColumnFilter',
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
    this.fetchSedes();
  }

  ngOnDestroy(): void {}

  private fetchSedes(): void {
    this.sedesList = this.sedesService
      .getAll()
      .pipe(map((response) => response.data));
  }

  loadTabla(){
    this.fetchSedes();
  }

  openCrearModal() {
    const modalRef = this.modal.open(CrearModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchSedes();
    });
  }

  openEditarModal(sede: { id_sede: string }) {
    const modalRef = this.modal.open(EditarModalComponent);
    modalRef.componentInstance.sedeId = sede.id_sede;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchSedes();
    });
  }

  openBorrarModal(sede: Sede) {
    if (!sede.id_sede) {
      console.error('La sede no tiene un id_sede definido.');
      return;
    }

    const modalRef = this.modal.open(BorrarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.sedeId = sede.id_sede;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchSedes();
    });
  }
}
