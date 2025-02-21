import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Paquete } from 'src/app/models/paquetes';
import { BehaviorSubject, Observable, combineLatest, map, startWith } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { Terapia } from 'src/app/models/terapia';
import { formatMoney } from 'src/app/utils/formatCurrency';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './paquetes.component.html',
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

  loadTabla() {
    this.paquetesService.getAll().pipe(
      map(resp => resp.data),
      untilDestroyed(this)
    ).subscribe(paquetes => {
      this.paquetesSubject.next(paquetes);
    });
  }
  
  getTerapiasNombres(terapias: Terapia[]): string {
    return terapias.map(terapia => terapia.nombre).join(', ');
  }


  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }
}
