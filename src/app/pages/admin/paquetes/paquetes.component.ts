import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Paquete } from 'src/app/models/paquetes';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { BorrarModalComponent } from './modales/borrar-modal/borrar-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionButtonsComponent } from './modales/action-buttons/action-buttons.component';

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
  modal = inject(NgbModal);

  paquetesList: Paquete[] = [];
  filteredList: Paquete[] = [];
  searchName: string = '';
  searchTerm$ = new Subject<string>();
  suggestions: string[] = [];
  showSuggestions: boolean = false;
  filterApplied: boolean = false;


  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'descripcion', headerName: 'Descripcion'},
    { field: 'cantidadsesiones', headerName: 'Cantidad de Sesiones'},
    { field: 'precioregular', headerName: 'Precio Regular'},
    { field: 'descuento', headerName: 'Descuento %'},
    { field: 'preciopaquete', headerName: 'Precio del Paquete'},
    { field: 'fechainicio', headerName: 'Fecha de Inicio'},
    { field: 'fechafin', headerName: 'Fecha de Fin'},
    { field: 'sesionesrestantes', headerName: 'Sesiones Restantes' },
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

    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          const suggestions = this.filterSuggestions(term);
          return [suggestions];
        })
      )
      .subscribe(suggestions => {
        this.suggestions = suggestions;
        this.showSuggestions = suggestions.length > 0;
      });
  }

  constructor() {
    console.log('PaquetesComponent instanciado');
  }

  private fetchPaquetes(): void {
    this.paquetesService.getAll()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response: any) => {
          console.log('Paquetes recibidos:', response);
          this.paquetesList = response.data; // Asegúrate de acceder a la propiedad correcta
          this.applyFilter();
        },
        error: (err) => {
          console.error('Error fetching paquetes:', err);
          this.paquetesList = [];
        }
      });
  }



  openCrearModal() {
    console.log('Intentando abrir el modal...');
    const modalRef = this.modal.open(CrearModalComponent, {
      size: 'lg',
      animation: true,
      centered: true,
    });

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPaquetes();
    });
  }


// En el componente que abre el modal
  openEditarModal(paquete: { id_paquetes: string }) {
    const modalRef = this.modal.open(EditarModalComponent);
    modalRef.componentInstance.paqueteId = paquete.id_paquetes;
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


  private applyFilter(): void {
    if (this.searchName.trim() === '') {
      this.filteredList = [...this.paquetesList];
    } else if (this.filterApplied) {
      this.filteredList = this.paquetesList.filter(paquete =>
        paquete.nombre.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
  }


  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchName = input.value;

    if (this.searchName.trim() === '') {
      this.filteredList = [...this.paquetesList];
    } else {
      this.searchTerm$.next(this.searchName);
    }
  }

  filterSuggestions(term: string): string[] {
    if (typeof term !== 'string') {
      return [];
    }

    return this.paquetesList
      .map(paquete => paquete.nombre)
      .filter(nombre => nombre.toLowerCase().includes(term.toLowerCase()))
      .slice(0, 10);
  }

  selectSuggestion(suggestion: string): void {
    this.searchName = suggestion;
    this.showSuggestions = false;
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 100);
  }

  applyFilterClick(): void {
    this.filterApplied = true;
    this.applyFilter();
  }

  trackById(index: number, item: Paquete): string {
    return item.id_paquetes;
  }

  delete(id: string): void {
    this.paquetesService.delete(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.fetchPaquetes();
        },
        error: (err) => {
          console.error('Error deleting paquete:', err);
        }
      });
  }

  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }
}
