import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Paquete } from 'src/app/models/paquetes';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  identity,
  iif,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
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
import { PacientesListaComponent } from './modales/pacientes-lista/pacientes-lista.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@UntilDestroy()
@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './paquetes.component.html',
  animations: [
    trigger('paquetesListAnimation', [
      transition(':enter', [
        style({ opacity: 0, scale:0.9 }),
        animate('300ms', style({ opacity: 1, scale:1 })),
      ]),
      transition(':leave', [animate('200ms', style({opacity: 0, scale:0.9}))]),
    ]),
  ],
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit, OnDestroy {
  paquetesService = inject(PaqueteService);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);
  modal = inject(NgbModal);
  banner_url = 'https://cdn-icons-png.flaticon.com/512/9573/9573235.png';

  localeText = AG_GRID_LOCALE_ES;
  searchControl = new FormControl('');
  private paquetesSubject = new BehaviorSubject<Paquete[]>([]);

  public paquetesList = combineLatest([
    this.paquetesSubject.asObservable(),
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value)
    )
  ]).pipe(
    map(([paquetes, searchTerm]) =>
      searchTerm 
        ? paquetes.filter(paquete =>
            paquete.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : paquetes
    )
  );

  ngOnInit(): void {
    this.loadTabla()
  }

  trackByFn(index: number, item: any) {
    return item.id_paquetes; // or any other unique identifier
  }

  openPacientesTable() {
    this.modal.open(PacientesListaComponent, {
      centered: true,
      size: 'lg',
    });
  }

  loadTabla() {
    this.paquetesService.getAll().pipe(
      map(resp => resp.data),
      untilDestroyed(this)
    ).subscribe(paquetes => {
      this.paquetesSubject.next(paquetes);
    });
  }

  openCrearModal() {
    const modalRef = this.modal.open(CrearModalComponent, {
      size: '350px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla()
    });
  }

  getTerapiasNombres(terapias: Terapia[]): string {
    return terapias.map((terapia) => terapia.nombre).join(', ');
  }

  openEditarModal(paquete: Paquete) {
    const modalRef = this.modal.open(EditarModalComponent);
    modalRef.componentInstance.paqueteId = paquete.id_paquetes; // Asegúrate que esto se esté pasando correctamente

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla()
    });
  }

  openBorrarModal(paquete: Paquete) {
    if (!paquete.id_paquetes) {
      return;
    }

    const modalRef = this.modal.open(BorrarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.paqueteId = paquete.id_paquetes;

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.loadTabla()
    });
  }

  openComprarModal(paquete: Paquete) {

    const modalRef = this.modal.open(ComprarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.paqueteId = paquete.id_paquetes;
  }

  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }
}
