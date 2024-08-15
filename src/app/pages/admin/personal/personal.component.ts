import { CrearModalComponent } from './modales/crear-modal/crear-modal.component';
import { EditarModalComponent } from './modales/editar-modal/editar-modal.component';
import { BorrarModalComponent } from './modales/borrar-modal/borrar-modal.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { Personal } from 'src/app/models/personal';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/services/loading.service';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { TipoPersonalService } from 'src/app/services/tipopersonal/tipopersonal.service';
import { TerapiaService } from 'src/app/services/terapia/terapia.service';
import { HorarioPersonalService } from 'src/app/services/horariopersonal/horariopersonal.service';
import { HorarioPersonal } from 'src/app/models/horariop';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
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
  tipoPersonalService = inject(TipoPersonalService);
  terapiaService = inject(TerapiaService);
  horariopersonalService = inject(HorarioPersonalService);
  tiposPersonalList: Array<any> = [];
  terapiasList: Array<any> = [];
  horariosList: Array<HorarioPersonal> = [];

  ngOnInit(): void {
    this.fetchPersonal();
    this.fetchTiposPersonal();
    this.fetchTerapias();
    this.fetchHorarios();

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

  openEditarModal(personal: Personal) {
    const modalRef = this.modal.open(EditarModalComponent, {
      size: 'lg',
      animation: true
    });
    modalRef.componentInstance.editForm.patchValue(personal);
  }

  openBorrarModal(personal: Personal) {
    const modalRef = this.modal.open(BorrarModalComponent, {
      size: '300px',
      animation: true,
      centered: true,
    });
    modalRef.componentInstance.personalId = personal.id_personal;
    modalRef.componentInstance.onSaveComplete.subscribe(() => {
      this.fetchPersonal();
    });
  }

  private fetchPersonal(): void {
    this.personalService.getAll().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.personalList = response.data.map((personal: any) => {
            // Encuentra el tipo de personal, terapia y horario correspondientes
            const tipoPersonal = this.tiposPersonalList.find(tp => tp.id_tipopersonal === personal.id_tipopersonal);
            const terapia = this.terapiasList.find(t => t.id_terapia === personal.id_terapia);
            const horario = this.horariosList.find(h => h.id_horariop === personal.id_horario); 

            return {
              ...personal,
              tipoPersonalName: tipoPersonal ? tipoPersonal.especialidad : 'Sin asignar',
              terapiaName: terapia ? terapia.nombre : 'Sin asignar',
              horarioIniciop: horario ? horario.horario_iniciop : 'No asignado',
              horarioFinalp: horario ? horario.horario_finalp : 'No asignado'
            };
          });
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


  private fetchTiposPersonal(): void {
    this.tipoPersonalService.getAll().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.tiposPersonalList = response.data;
        } else {
          console.error('Expected an array in response.data but received:', response.data);
        }
      },
      error: (err: any) => {
        console.error('Error fetching tipos personal data:', err);
      }
    });
  }

  private fetchTerapias(): void {
    this.terapiaService.getAll().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.terapiasList = response.data;
        } else {
          console.error('Expected an array in response.data but received:', response.data);
        }
      },
      error: (err: any) => {
        console.error('Error fetching terapias data:', err);
      }
    });
  }

  private fetchHorarios(): void {
    this.horariopersonalService.getAll().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.horariosList = response.data;
        } else {
          console.error('Expected an array in response.data but received:', response.data);
        }
      },
      error: (err: any) => {
        console.error('Error fetching horarios data:', err);
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
