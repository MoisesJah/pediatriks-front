import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Inventario } from 'src/app/models/inventario';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';

import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { SolicitarModalComponent } from './modales/solicitar-modal/solicitar-modal.component';
import { MiStockComponent } from './modales/mi-stock/mi-stock.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
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
  searchControl = new FormControl('');
  banner_url = 'https://cdn-icons-png.flaticon.com/512/9573/9573235.png';

  ngOnInit(): void {
    this.fetchInventario();
  }

  private fetchInventario(): void {
    const value = this.searchControl.valueChanges.pipe(startWith(''));

    this.inventarioList = combineLatest([
      this.inventarioService.getAll().pipe(
        map((resp) => resp.data),
        untilDestroyed(this)
      ),
      value,
    ]).pipe(
      map(([inventarios, searchTerm]) =>
        searchTerm
          ? inventarios.filter((int) =>
              int.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : inventarios
      )
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

  openSolicitarModal(item: Inventario) {
    const modalRef = this.modal.open(SolicitarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.inventarioId = item.id;
    modalRef.componentInstance.onRequestComplete.subscribe(() => {
      this.fetchInventario();
    });
  }

  openStockModal() {
    this.modal.open(MiStockComponent, {
      centered: true,
      size: 'lg'
    });
  }

  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }
}
