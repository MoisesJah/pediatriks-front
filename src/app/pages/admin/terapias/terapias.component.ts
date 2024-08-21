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
import { ColDef } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';

import { formatMoney } from 'src/app/utils/formatCurrency';

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

  terapiasList: Observable<Terapia[]> = new Observable();
  localeText = AG_GRID_LOCALE_ES

  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'descripcion', headerName: 'Descripción', filter: true },
    {
      field: 'precio',
      headerName: 'Precio',
      filter: 'agNumberColumnFilter',
      cellClass: 'fw-bold',

      valueFormatter: (params) => formatMoney(params.value),
      // filterParams: {
      //   numberParser: (num) => num.replace('$', ''),
      // },
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

  ngOnDestroy(): void {}

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

    modalRef.componentInstance.terapiaForm.patchValue(terapia);
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
