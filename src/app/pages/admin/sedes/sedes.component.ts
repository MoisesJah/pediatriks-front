import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SedesService } from 'src/app/services/sedes/sedes.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Sede } from 'src/app/models/sede';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { BorrarModalComponent } from './modales/borrar-modal/borrar-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ActionButtonsComponent } from './modales/action-buttons/action-buttons.component';

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

  sedesList: Sede[] = [];
  filteredList: Sede[] = [];
  searchName: string = '';
  searchTerm$ = new Subject<string>();
  suggestions: string[] = [];
  showSuggestions: boolean = false;
  filterApplied: boolean = false;

  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'direccion', headerName: 'Dirección' },
    { field: 'distrito', headerName: 'Distrito' },
    { field: 'provincia', headerName: 'Provincia' },
    { field: 'departamento', headerName: 'Departamento' },
    { field: 'telefono', headerName: 'Telefono' },
    { field: 'email', headerName: 'Correo' },
    { field: 'horarioapertura', headerName: 'Hora de Apertura' },
    { field: 'horariocierre', headerName: 'Hora de Cierre' },
    { field: 'capacidadpacientes', headerName: 'Capacidad de Pacientes' },
    { field: 'numeroconsultorios', headerName: 'Número de Consultorios' },
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
    console.log('SedesComponent instanciado');
  }

  private fetchSedes(): void {
    this.sedesService.getAll()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response: any) => {
          console.log('Sedes recibidas:', response);
          this.sedesList = response.data;
          this.applyFilter();
        },
        error: (err) => {
          console.error('Error fetching sedes:', err);
          this.sedesList = [];
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

  private applyFilter(): void {
    if (this.searchName.trim() === '') {
      this.filteredList = [...this.sedesList];
    } else if (this.filterApplied) {
      this.filteredList = this.sedesList.filter(sede =>
        sede.nombre.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
  }

  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchName = input.value;

    if (this.searchName.trim() === '') {
      this.filteredList = [...this.sedesList];
    } else {
      this.searchTerm$.next(this.searchName);
    }
  }

  filterSuggestions(term: string): string[] {
    if (typeof term !== 'string') {
      return [];
    }

    return this.sedesList
      .map(sede => sede.nombre)
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

  trackById(index: number, item: Sede): number {
    return item.id_sede;
  }


  delete(id: number): void {
    this.sedesService.delete(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.fetchSedes();
        },
        error: (err) => {
          console.error('Error deleting sede:', err);
        }
      });
  }


  ngOnDestroy(): void {
    // Limpiar recursos si es necesario
  }
}
