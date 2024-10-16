import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Inventario } from 'src/app/models/inventario';
import { Observable, map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { BorrarModalComponent } from './modales/borrar-modal/borrar-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { AgregarModalComponent } from './modales/agregar-modal/agregar-modal.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AgGridAngular],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit, OnDestroy {
  inventarioService = inject(InventarioService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  modal = inject(NgbModal);

  inventarioList: Observable<Inventario[]> = new Observable();
  localeText = AG_GRID_LOCALE_ES;
  private gridApi!: GridApi;

  ngOnInit(): void {
    this.fetchInventario();
  }

  private fetchInventario(): void {
    this.inventarioList = this.inventarioService.getAll().pipe(
      map((resp) => {
        console.log('Inventario recibido:', resp.data);
        return resp.data;
      }),
      untilDestroyed(this)
    );
  }

  loadTabla() {
    this.fetchInventario();
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('item-search') as HTMLInputElement).value
    );
  }

  openCrearModal() {
    const modalRef = this.modal.open(CrearModalComponent, {
      size: '350px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchInventario();
    });
  }

  openEditarModal(item: Inventario) {
    const modalRef = this.modal.open(EditarModalComponent);
    modalRef.componentInstance.inventarioId = item.id;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchInventario();
    });
  }

  openBorrarModal(item: Inventario) {
    if (!item.id) {
      console.error('El artículo no tiene un id_inventario definido.');
      return;
    }

    const modalRef = this.modal.open(BorrarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.inventarioId = item.id;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchInventario();
    });
  }

  openAgregarModal(item: Inventario) {
    if (!item.id) {
      console.error('El artículo no tiene un id_inventario definido.');
      return;
    }

    const modalRef = this.modal.open(AgregarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.inventarioId = item.id;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchInventario();
    });
}

  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }
}
