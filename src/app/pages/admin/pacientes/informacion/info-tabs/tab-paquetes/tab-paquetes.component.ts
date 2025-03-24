import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgbAccordionModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ReporteService } from 'src/app/services/paciente/reporte/reporte.service';
import { ThemeService } from 'src/app/services/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-tab-paquetes',
  standalone: true,
  imports: [AgGridAngular, CommonModule, NgbAccordionModule],
  templateUrl: './tab-paquetes.component.html',
  styleUrl: './tab-paquetes.component.scss',
})
export class TabPaquetesComponent implements OnInit {
  reporteService = inject(ReporteService);
  activatedRoute = inject(ActivatedRoute);
  isLoading = inject(LoadingService).isLoading;
  theme = inject(ThemeService);

  id_paciente = this.activatedRoute.snapshot.paramMap.get('id');

  localeText = AG_GRID_LOCALE_ES;

  historialList = new Observable();
  paquetesList = new Observable();
  historialData = [];

  private historialSubjects = new Map<string, BehaviorSubject<any[]>>();
  private dataLoaded = new Map<string, boolean>();
  private loadingStates = new Map<string, BehaviorSubject<boolean>>();

  columnDefs: ColDef[] = [
    { field: 'id_pa', headerName: 'ID', filter: true },
    { field: 'num_sesiones', headerName: 'N° Sesiones', filter: true },
    { field: 'metodo_pago', headerName: 'Método de Pago', filter: true },
    { field: 'precio', headerName: 'Precio', filter: true },
    { field: 'fecha_compra', headerName: 'Fecha Compra', filter: true },
  ];

  ngOnInit(): void {
    // this.getHistorial()
    this.getPaquetes();
  }

  getHistorialSubject(id: string): BehaviorSubject<any[]> {
    if (!this.historialSubjects.has(id)) {
      // Create a new BehaviorSubject with empty array initial value
      const subject = new BehaviorSubject<any[]>([]);
      this.historialSubjects.set(id, subject);
    }

    return this.historialSubjects.get(id)!;
  }

  // Method to get or create a loading state for a specific ID
  getLoadingState(id: string): BehaviorSubject<boolean> {
    if (!this.loadingStates.has(id)) {
      // Create a new BehaviorSubject with false initial value (not loading)
      const subject = new BehaviorSubject<boolean>(false);
      this.loadingStates.set(id, subject);
    }
    return this.loadingStates.get(id)!;
  }

  loadHistorialData(id: string, forceRefresh: boolean = false): void {
    this.getLoadingState(id).next(true);

    this.reporteService
      .getPaquetes(this.id_paciente!)
      .pipe(
        map((resp: any) =>
          resp.data.compras.flatMap((compra: any) =>
            compra.historial.filter((item: any) => item.id_paq === id)
          )
        ),
        finalize(() => this.getLoadingState(id).next(false)),
        untilDestroyed(this)
      )
      .subscribe((data) => {
        // Get the BehaviorSubject and update its value
        const subject = this.getHistorialSubject(id);
        subject.next(data);
      });
  }

  getPaquetes() {
    this.paquetesList = this.reporteService.getPaquetes(this.id_paciente!).pipe(
      map((resp: any) => resp.data.compras),
      untilDestroyed(this)
    );
  }
}
