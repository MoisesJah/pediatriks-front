import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { Personal } from 'src/app/models/personal';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { EditModalComponent } from '../users/modals/edit-modal/edit-modal.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  personalService = inject(PersonalService);
  personalList: Array<Personal> = [];
  filteredList: Array<Personal> = [];
  searchName: string = '';
  searchTerm$ = new Subject<string>();
  suggestions: string[] = [];
  showSuggestions: boolean = false;
  filterApplied: boolean = false;
  modal = inject(NgbModal);
  isLoading = inject(LoadingService).isLoading;

  ngOnInit(): void {
    this.fetchPersonal();

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

  openCrearModal() {
    const modalRef = this.modal.open(
      CrearModalComponent,
      { size: 'lg', animation: true }
    );

    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPersonal();
    });
  }

  // openEditarModal(personalId: string) {
  //   const id = Number(personalId); // Convertir el ID a número si es necesario
  //   this.personalService.getById(id).subscribe({
  //     next: (personal: Personal) => {
  //       const modalRef = this.modal.open(
  //         EditarModalComponent,
  //         { size: 'lg', animation: true }
  //       );

  //       // Pasar los datos del personal al modal
  //       modalRef.componentInstance.loadPersonalData(personal);

  //       // Actualizar la vista después de guardar los cambios
  //       modalRef.componentInstance.onSaveComplete.subscribe(() => {
  //         this.fetchPersonal(); // Llama a tu método para actualizar la lista
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Error loading personal data:', err);
  //     }
  //   });
  // }

  openEditarModal(personal: Personal) {
    const modalRef = this.modal.open(EditarModalComponent, {
      size: 'lg',
      animation: true
    })
    modalRef.componentInstance.editForm.patchValue(personal);
  }

  private fetchPersonal(): void {
    this.personalService.getAll().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.personalList = response.data;
          this.applyFilter();
        } else {
          console.error('Expected an array in response.data but received:', response.data);
        }
      },
      error: (err: any) => {
        console.error('Error fetching personal data:', err);
      }
    });
  }

  applyFilter(): void {
    if (this.searchName.trim() === '') {
      this.filteredList = [...this.personalList];
    } else if (this.filterApplied) {
      this.filteredList = this.personalList.filter(personal =>
        personal.nombre.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
  }

  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchName = input.value;

    if (this.searchName.trim() === '') {
      this.filteredList = [...this.personalList];
    } else {
      this.searchTerm$.next(this.searchName);
    }
  }

  filterSuggestions(term: string): string[] {
    if (typeof term !== 'string') {
      return [];
    }

    return this.personalList
      .map(personal => personal.nombre)
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

  trackById(index: number, item: Personal): number {
    return item.id_personal;
  }

  delete(id: number): void {
    this.personalService.delete(id).subscribe({
      next: () => {
        this.fetchPersonal();
      },
      error: (err) => {
        console.error('Error deleting personal:', err);
      }
    });
  }
}
