import { CommonModule, formatCurrency } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateModalComponent } from './modals/create-modal/create-modal.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { Terapia } from 'src/app/models/terapia';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { AgGridAngular } from 'ag-grid-angular';
import { map, Observable } from 'rxjs';
import { ActionButtonsComponent } from './modals/action-buttons/action-buttons.component';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';

import { formatMoney } from 'src/app/utils/formatCurrency';
import { LoadingService } from 'src/app/services/loading.service';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-terapias',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  templateUrl: './terapias.component.html',
  styleUrl: './terapias.component.scss',
})
export class TerapiasComponent implements OnInit, OnDestroy {
  modal = inject(NgbModal);
  terapias = inject(TerapiaService);
  theme = inject(ThemeService)
  isLoading = inject(LoadingService).isLoading;

  private gridApi!: GridApi;

  terapiasList: Observable<Terapia[]> = new Observable();
  localeText = AG_GRID_LOCALE_ES;

  colDefs: ColDef[] = [
    {
      headerName: 'Color',
      field: 'color',
      maxWidth: 75,
      filter:false,
      cellRenderer: (params: any) => {
        return `<div class="h-20px w-20px mt-3 rounded-circle" style="background-color: ${params.value}"></div>`;
      }
    },
    { field: 'nombre', headerName: 'Nombre', filter: true, resizable: true, },
    { field: 'descripcion', headerName: 'Descripción', filter: true, resizable: true, },
    {
      field: 'precio',
      headerName: 'Precio',
      maxWidth: 120,
      filter: 'agNumberColumnFilter',
      cellClass: 'fw-bold',

      valueFormatter: (params) => formatMoney(params.value),
      resizable: true,
    },
    {
      headerName: 'Duración',
      field: 'duracion',
      maxWidth: 150,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => params.value ? `${params.value.substring(0, 5)} min` : '',
      resizable: true,
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
    this.fetchTerapias();
  }

  fetchTerapias() {
    this.terapiasList = this.terapias.getAll().pipe(
      map((resp) => {
        return resp.data as Terapia[];
      }),
      untilDestroyed(this)
    );
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.sizeColumnsToFit();
  }

  sizeColumnsToFit(): void {
    const handleResize = () => this.gridApi.sizeColumnsToFit();
    const resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth >= 768) {
        handleResize();
      }
    });

    resizeObserver.observe(document.body);
    handleResize(); // Call it initially too
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('terapia-search') as HTMLInputElement).value
    );
  }

  ngOnDestroy(): void {}

  loadTabla(){
    this.fetchTerapias();
  }

  openCreateModal() {
    const modalRef = this.modal.open(CreateModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchTerapias();
    });
  }

  openEditModal(terapia: Terapia) {
    const modalRef = this.modal.open(EditModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.terapiaId = terapia.id_terapia;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchTerapias();
    });
  }

  openDeleteModal(terapia: Terapia) {
    const modalRef = this.modal.open(DeleteModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.terapiaId = terapia.id_terapia;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchTerapias();
    });
  }
}
