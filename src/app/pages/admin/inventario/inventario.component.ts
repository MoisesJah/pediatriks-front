import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Inventario } from 'src/app/models/inventario';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { BorrarModalComponent } from './modales/borrar-modal/borrar-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { AgregarModalComponent } from './modales/agregar-modal/agregar-modal.component';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { TablaInventarioComponent } from './modales/main-modal/tabla-inventario/tabla-inventario.component';
import { MainModalComponent } from './modales/main-modal/main-modal.component';
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
  banner_url = 'https://cdn-icons-png.flaticon.com/512/9573/9573235.png';

  inventarioList: Observable<Inventario[]> = new Observable();
  localeText = AG_GRID_LOCALE_ES;
  searchControl = new FormControl('');

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

  openTablaInventarioModal() {
    this.modal.open(MainModalComponent, {
      size: 'xl',
      animation: true,
      centered: true,
    });
  }

  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }
}
