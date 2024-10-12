import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Paquete } from 'src/app/models/paquetes';
import { Observable, map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { BorrarModalComponent } from './modales/borrar-modal/borrar-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { ComprarModalComponent } from './modales/comprar-modal/comprar-modal.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { ActionButtonsComponent } from './modales/action-buttons/action-buttons.component';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { Terapia } from 'src/app/models/terapia';
import { formatMoney } from 'src/app/utils/formatCurrency';
import { ImageDisplayComponent } from './modales/image-display/image-display.component';

@UntilDestroy()
@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit, OnDestroy {
  paquetesService = inject(PaqueteService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  modal = inject(NgbModal);

  paquetesList: Observable<Paquete[]> = new Observable();
  localeText = AG_GRID_LOCALE_ES;
  private gridApi!: GridApi;
  

  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'descripcion', headerName: 'Descripcion' },
    {
      field: 'terapias',
      headerName: 'Terapias Incluidas',
      filter: true,
      filterValueGetter: (params: any) => {
        const therapies = params.data.terapias as Terapia[];
        return therapies.map((therapy) => therapy.nombre).join(', ');
      },
      valueFormatter: (params: any) => {
        const therapies = params.data.terapias as Terapia[];
        return therapies.map((therapy) => therapy.nombre).join(', ');
      },
      cellRenderer: (params: any) => {
        const therapies = params.data.terapias as Terapia[];
        return `<ul>${therapies
          .map((therapy) => `<li>${therapy.nombre}</li>`)
          .join('')}</ul>`;
      },
      autoHeight: true,
    },
    {
      field: 'cantidadsesiones',
      headerName: 'N° de Sesiones',
      maxWidth: 150,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'precioregular',
      headerName: 'Precio Regular',
      valueFormatter: (params) => formatMoney(params.value),
    },
    {
      field: 'descuento',
      headerName: 'Descuento',
      valueFormatter: (params) => `${params.value}%`,
    },
    {
      field: 'preciopaquete',
      headerName: 'Precio del Paquete',
      valueFormatter: (params) => formatMoney(params.value),
    },
    {
      field: 'fechainicio',
      headerName: 'Fecha de Inicio',
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en'),
    },
    {
      field: 'fechafin',
      headerName: 'Fecha de Fin',
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en'),
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
    this.fetchPaquetes();
  }

  private fetchPaquetes(): void {
    this.paquetesList = this.paquetesService.getAll().pipe(
      map((resp) => {
        console.log('Paquetes recibidos:', resp.data);
        return resp.data;
      }),
      untilDestroyed(this)
    );
  }


  loadTabla() {
    this.fetchPaquetes();
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('paquete-search') as HTMLInputElement).value
    );
  }

  openCrearModal() {
    const modalRef = this.modal.open(CrearModalComponent, {
      size: '350px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPaquetes();
    });
  }

  getTerapiasNombres(terapias: Terapia[]): string {
    return terapias.map(terapia => terapia.nombre).join(', ');
  }

  openEditarModal(paquete: Paquete) {
    const modalRef = this.modal.open(EditarModalComponent);
    modalRef.componentInstance.paqueteId = paquete.id_paquetes; // Asegúrate que esto se esté pasando correctamente

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPaquetes();
    });
  }

  openBorrarModal(paquete: Paquete) {
    if (!paquete.id_paquetes) {
      console.error('El paquete no tiene un id_paquete definido.');
      return;
    }

    const modalRef = this.modal.open(BorrarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.paqueteId = paquete.id_paquetes;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPaquetes();
    });
  }

  openComprarModal(paquete: Paquete) {
    const modalRef = this.modal.open(ComprarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.paquete = paquete;
  }

  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }
}
