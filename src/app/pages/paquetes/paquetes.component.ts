import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaqueteService } from 'src/app/services/paquetes/paquete.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Paquete } from 'src/app/models/paquetes';
import { Observable, map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HeaderComponent } from 'src/app/components/ui/header/header.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ThemeService } from 'src/app/services/theme.service';
import { Terapia } from 'src/app/models/terapia';
import { formatMoney } from 'src/app/utils/formatCurrency';

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
  theme = inject(ThemeService);
  modal = inject(NgbModal);

  paquetesList: Observable<Paquete[]> = new Observable();
  localeText = AG_GRID_LOCALE_ES;
  private gridApi!: GridApi;


  colDefs: ColDef[] = [
    { field: 'nombre', headerName: 'Nombre', filter: true },
    { field: 'descripcion', headerName: 'Descripcion' },
    {
      field: 'terapias',
      headerName: 'Terapias Incluidas',
      filter: true,
      filterValueGetter: (params: any) => {
        const therapies = params.data.terapias as Terapia[];
        return therapies.map((therapy) => therapy.nombre).join(', ');
      },
      valueFormatter: (params: any) => {
        const therapies = params.data.terapias as Terapia[];
        return therapies.map((therapy) => therapy.nombre).join(', ');
      },
      cellRenderer: (params: any) => {
        const therapies = params.data.terapias as Terapia[];
        return `<ul>${therapies
          .map((therapy) => `<li>${therapy.nombre}</li>`)
          .join('')}</ul>`;
      },
      autoHeight: true,
    },
    {
      field: 'cantidadsesiones',
      headerName: 'Cantidad de Sesiones',
    },
    {
      field: 'precioregular',
      headerName: 'Precio Regular',
      valueFormatter: (params) => formatMoney(params.value),
    },
    {
      field: 'descuento',
      headerName: 'Descuento',
      valueFormatter: (params) => `${params.value}%`,
    },
    {
      field: 'preciopaquete',
      headerName: 'Precio del Paquete',
      valueFormatter: (params) => formatMoney(params.value),
    },
    {
      field: 'fechainicio',
      headerName: 'Fecha de Inicio',
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en'),
    },
    {
      field: 'fechafin',
      headerName: 'Fecha de Fin',
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy', 'en'),
    },
  ];

  ngOnInit(): void {
    this.fetchPaquetes();
  }

  private fetchPaquetes(): void {
    this.paquetesList = this.paquetesService.getAll().pipe(
      map((resp) => resp.data),
      untilDestroyed(this)
    );
  }

  loadTabla() {
    this.fetchPaquetes();
  }

  gridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('paquete-search') as HTMLInputElement).value
    );
  }


  ngOnDestroy(): void {
    // Llamar a un método en el caso de que necesite limpiar recursos
  }
}
